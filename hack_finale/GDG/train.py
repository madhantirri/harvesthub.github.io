import pandas as pd
import joblib
import os
from xgboost import XGBRegressor
from feature_engineering import create_features

DATA_FILE = "data/Agriculture_Dataset_2020_2026.xlsx"
MODEL_DIR = "models"

os.makedirs(MODEL_DIR, exist_ok=True)

df = pd.read_excel(DATA_FILE)
df["Date"] = pd.to_datetime(df["Date"])

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

for commodity in df["Commodity"].unique():
    print(f"Training model for {commodity}...")

    cdf = df[df["Commodity"] == commodity].copy()
    cdf = create_features(cdf)

    X = cdf[FEATURES]
    y = cdf[TARGET]

    model = XGBRegressor(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42
    )

    model.fit(X, y)
    joblib.dump(model, f"{MODEL_DIR}/{commodity}.pkl")

print("✅ Training complete. Models saved in /models")
