import pandas as pd
import joblib
import os
import csv
from datetime import datetime
from feature_engineering import create_features

DATA_FILE = "data/Agriculture_Dataset_2020_2026.xlsx"

LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "prediction_history.csv")

def log_prediction(row: dict):
    os.makedirs(LOG_DIR, exist_ok=True)

    file_exists = os.path.isfile(LOG_FILE)

    with open(LOG_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=row.keys())

        if not file_exists:
            writer.writeheader()

        writer.writerow(row)

FEATURES = [
    "MSP",
    "Procurement_Season_Flag",
    "Export_Ban_Flag",
    "FCI_Stock_LMT",
    "Daily_Arrivals_Tonnes",
    "Rainfall_Deviation_Pct",
    "Festival_Season_Flag",
    "Fertilizer_Price_Index",
    "Price_Lag_1",
    "Price_Lag_3",
    "Price_Lag_7",
    "Price_MA_7",
    "Price_MA_14",
    "Price_Trend",
    "Arrival_MA_7",
    "Rain_7d_Avg"
]


# ---------------- SEASONAL OUTLOOK ----------------

def seasonal_outlook(date):
    month = date.month

    if month in [1, 2]:
        return {
            "trend": "bearish",
            "time_horizon": "3–6 weeks",
            "reason": "Rabi harvest approaching, supply likely to increase"
        }

    if month in [3, 4]:
        return {
            "trend": "bearish",
            "time_horizon": "current",
            "reason": "Active harvest season, high arrivals"
        }

    if month in [8, 9]:
        return {
            "trend": "bullish",
            "time_horizon": "2–4 weeks",
            "reason": "Monsoon withdrawal, supply tightening expected"
        }

    return {
        "trend": "neutral",
        "time_horizon": "near term",
        "reason": "No major seasonal transition"
    }


# ---------------- CORE BACKEND FUNCTION ----------------

def get_market_intelligence(commodity: str) -> dict:
    df = pd.read_excel(DATA_FILE)
    df.columns = df.columns.str.strip()
    df["Date"] = pd.to_datetime(df["Date"])

    cdf = df[df["Commodity"] == commodity].copy()
    cdf = create_features(cdf)

    if len(cdf) < 30:
        return {
            "error": "Not enough data to generate prediction",
            "commodity": commodity
        }

    model = joblib.load(f"models/{commodity}.pkl")
    latest = cdf.iloc[-1:].copy()

    # ---------- 7 DAY FORECAST ----------
    forecast = {}
    preds = []

    for day in range(1, 8):
        pred = float(model.predict(latest[FEATURES])[0])
        forecast[f"day_{day}"] = round(pred, 2)
        preds.append(pred)

        latest["Price_Lag_7"] = latest["Price_Lag_3"]
        latest["Price_Lag_3"] = latest["Price_Lag_1"]
        latest["Price_Lag_1"] = pred

        latest["Price_MA_7"] = (latest["Price_MA_7"] * 6 + pred) / 7
        latest["Price_MA_14"] = (latest["Price_MA_14"] * 13 + pred) / 14
        latest["Price_Trend"] = latest["Price_MA_7"] - latest["Price_MA_14"]

    # ---------- CONFIDENCE BAND ----------
    recent_vol = cdf["Daily_Mandi_Price"].tail(14).std()
    band_width = 1.5 * recent_vol

    confidence_band = {
        "lower_bound": round(min(preds) - band_width, 2),
        "upper_bound": round(max(preds) + band_width, 2),
        "volatility_level": (
            "low" if recent_vol < 1.5 else
            "medium" if recent_vol < 4 else
            "high"
        )
    }

    # ---------- HISTORICAL COMPARISON ----------
    last_price = cdf["Daily_Mandi_Price"].iloc[-1]
    price_7d_ago = cdf["Daily_Mandi_Price"].iloc[-7]

    weekly_change_pct = round(
        ((last_price - price_7d_ago) / price_7d_ago) * 100, 2
    )

    one_year_ago = latest["Date"].iloc[0] - pd.Timedelta(days=365)
    past_year = cdf[cdf["Date"] <= one_year_ago]

    yoy_change = None
    if not past_year.empty:
        price_last_year = past_year.iloc[-1]["Daily_Mandi_Price"]
        yoy_change = round(
            ((last_price - price_last_year) / price_last_year) * 100, 2
        )

    # ---------- FINAL JSON ----------
    result = {
        "commodity": commodity,
        "generated_on": datetime.now().isoformat(),
        "forecast_7_days": forecast,
        "confidence_band": confidence_band,
        "historical_comparison": {
            "vs_last_week_pct": weekly_change_pct,
            "vs_last_year_pct": yoy_change
        },
        "seasonal_outlook": seasonal_outlook(latest["Date"].iloc[0])
    }

    # -------- LOG PREDICTION --------
    log_prediction({
        "timestamp": result["generated_on"],
        "commodity": commodity,
        "last_price": round(last_price, 2),
        "avg_7day_prediction": round(sum(preds) / len(preds), 2),
        "volatility_level": confidence_band["volatility_level"],
        "seasonal_trend": result["seasonal_outlook"]["trend"],
        "weekly_change_pct": weekly_change_pct
    })

    return result

