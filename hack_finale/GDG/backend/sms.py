USE_REAL_SMS = True   # 🔴 KEEP False FOR EXAMS

from twilio.rest import Client

ACCOUNT_SID = "ACbba994648a70335c12a592a499f3176e"
AUTH_TOKEN = "91911460b55381b12bc56c4f7b2ced94"
FROM_NUMBER = "+18782187391"  # Twilio SMS number

client = Client(ACCOUNT_SID, AUTH_TOKEN)


def send_sms(to_number, message):
    to_number = str(to_number)

    if not to_number.startswith("+"):
        print(f"❌ Invalid phone format: {to_number}")
        return None

    if not USE_REAL_SMS:
        print("📩 SMS MOCK MODE")
        print("To:", to_number)
        print("Message:\n", message)
        return "mock_sid"

    try:
        msg = client.messages.create(
            body=message,
            from_=FROM_NUMBER,
            to=to_number
        )
        return msg.sid

    except Exception as e:
        print("❌ SMS sending failed:", e)
        return None
