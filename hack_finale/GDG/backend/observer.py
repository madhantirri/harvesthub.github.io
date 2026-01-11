import pandas as pd
from backend.intelligence import get_market_intelligence
from backend.exit_engine import decide_exit_signal
from backend.commitments import settle_commitment, _fetch_latest_price
from backend.sms import send_sms

COMMIT_FILE = "logs/commitments.csv"


def observe_commitments():
    df = pd.read_csv(COMMIT_FILE)

    # 🔧 FORCE CORRECT DTYPES
    df["user_id"] = df["user_id"].astype(str)
    df["current_signal"] = df["current_signal"].astype(str)
    df["last_notified_signal"] = df["last_notified_signal"].astype(str)

    for i, row in df[df["status"] == "active"].iterrows():
        market = get_market_intelligence(row["commodity"])
        signal, reason = decide_exit_signal(market)

        # Notify on signal change
        if signal != row["current_signal"]:
            df.loc[i, "current_signal"] = signal
            df.loc[i, "last_notified_signal"] = signal

            message = (
                f"{signal} ALERT – {row['commodity']}\n\n"
                f"Reason: {reason}\n\n"
                f"Advisory only. Final decision is yours."
            )

            send_sms(
                to_number=row["user_id"],
                message=message
            )

        # SELL → settle
        if signal == "SELL":
            exit_price = _fetch_latest_price(row["commodity"])
            settlement = settle_commitment(row, exit_price)

            df.loc[i, "exit_price"] = settlement["exit_price"]
            df.loc[i, "gross_profit"] = settlement["gross_profit"]
            df.loc[i, "platform_fee"] = settlement["platform_fee"]
            df.loc[i, "status"] = settlement["status"]

    # ✅ SINGLE WRITE
    df.to_csv(COMMIT_FILE, index=False)


if __name__ == "__main__":
    observe_commitments()
