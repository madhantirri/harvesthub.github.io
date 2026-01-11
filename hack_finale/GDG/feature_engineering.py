import pandas as pd

def create_features(df):
    df = df.sort_values("Date")

    # Price lags
    df["Price_Lag_1"] = df["Daily_Mandi_Price"].shift(1)
    df["Price_Lag_3"] = df["Daily_Mandi_Price"].shift(3)
    df["Price_Lag_7"] = df["Daily_Mandi_Price"].shift(7)

    # Rolling averages
    df["Price_MA_7"] = df["Daily_Mandi_Price"].rolling(7).mean()
    df["Price_MA_14"] = df["Daily_Mandi_Price"].rolling(14).mean()
    df["Price_Trend"] = df["Price_MA_7"] - df["Price_MA_14"]

    # Supply features
    df["Arrival_MA_7"] = df["Daily_Arrivals_Tonnes"].rolling(7).mean()

    # Weather memory
    df["Rain_7d_Avg"] = df["Rainfall_Deviation_Pct"].rolling(7).mean()

    df = df.dropna().reset_index(drop=True)
    return df
