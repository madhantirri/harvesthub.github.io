import pandas as pd
import numpy as np
import joblib
from sklearn.metrics import mean_absolute_percentage_error, mean_squared_error
from feature_engineering import create_features

# =========================
# CONFIG
# =========================

DATA_FILE = "data/Agriculture_Dataset_2020_2026.xlsx"
COMMODITIES = ["Banana", "Coconut", "Rice", "Wheat"]

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

TARGET = "Daily_Mandi_Price"

# =========================
# EVALUATION FUNCTION
# =========================

def evaluate_commodity(commodity):
    # Load data
    df = pd.read_excel(DATA_FILE)
    df.columns = df.columns.str.strip()
    df["Date"] = pd.to_datetime(df["Date"])

    cdf = df[df["Commodity"] == commodity].copy()
    cdf = create_features(cdf)

    if len(cdf) < 50:
        return {
            "commodity": commodity,
            "error": "Not enough data for evaluation"
        }

    # Time-based train-test split (80% / 20%)
    split_idx = int(len(cdf) * 0.8)
    test = cdf.iloc[split_idx:]

    X_test = test[FEATURES]
    y_test = test[TARGET]

    # Load trained model
    model = joblib.load(f"models/{commodity}.pkl")

    # Predictions
    preds = model.predict(X_test)

    # =========================
    # METRICS
    # =========================

    # MAPE
    mape = mean_absolute_percentage_error(y_test, preds) * 100

    # RMSE
    rmse = np.sqrt(mean_squared_error(y_test, preds))

    # =========================
    # DIRECTIONAL ACCURACY
    # =========================

    actual_dir = np.sign(y_test.diff().iloc[1:].values)
    pred_dir = np.sign(np.diff(preds))

    directional_accuracy = (
        (actual_dir == pred_dir).sum() / len(actual_dir)
    ) * 100

    # =========================
    # CLEAN OUTPUT
    # =========================

    return {
        "commodity": commodity,
        "mape_pct": float(round(mape, 2)),
        "rmse": float(round(rmse, 2)),
        "directional_accuracy_pct": float(round(directional_accuracy, 2)),
        "test_samples": int(len(y_test))
    }

# =========================
# RUN ALL COMMODITIES
# =========================

if __name__ == "__main__":
    print("\n=== MODEL ACCURACY REPORT ===")
    for commodity in COMMODITIES:
        print(f"📊 Evaluating {commodity}...")
        result = evaluate_commodity(commodity)
        print(result)
