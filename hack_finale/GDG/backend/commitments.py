import os
import csv
import uuid
import pandas as pd
from datetime import datetime

DATA_FILE = "data/Agriculture_Dataset_2020_2026.xlsx"
COMMIT_FILE = "logs/commitments.csv"
PLATFORM_FEE_RATE = 0.10


def _ensure_file():
    os.makedirs("logs", exist_ok=True)
    if not os.path.exists(COMMIT_FILE):
        with open(COMMIT_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "commit_id","user_id","commodity","entry_price",
                "quantity","entry_date","current_signal",
                "last_notified_signal","exit_price",
                "gross_profit","platform_fee","status"
            ])


def _fetch_latest_price(commodity):
    df = pd.read_excel(DATA_FILE)
    df["Date"] = pd.to_datetime(df["Date"])
    row = df[df["Commodity"] == commodity].iloc[-1]
    return float(row["Daily_Mandi_Price"])


def create_commitment(user_phone, commodity, quantity):
    """
    user_phone format: +91XXXXXXXXXX
    """
    _ensure_file()

    entry_price = _fetch_latest_price(commodity)
    commit_id = str(uuid.uuid4())[:8]

    with open(COMMIT_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            commit_id,
            str(user_phone),
            commodity,
            entry_price,
            quantity,
            datetime.now().isoformat(),
            "HOLD",
            "",
            "",
            "",
            "",
            "active"
        ])

    return {
        "commit_id": commit_id,
        "phone": user_phone,
        "commodity": commodity,
        "entry_price": entry_price,
        "quantity": quantity,
        "status": "active"
    }


def settle_commitment(row, exit_price):
    gross_profit = (exit_price - row["entry_price"]) * row["quantity"]
    platform_fee = gross_profit * PLATFORM_FEE_RATE if gross_profit > 0 else 0

    return {
        "exit_price": round(exit_price, 2),
        "gross_profit": round(gross_profit, 2),
        "platform_fee": round(platform_fee, 2),
        "status": "unpaid" if gross_profit > 0 else "settled"
    }
