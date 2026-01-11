import json
from backend.intelligence import get_market_intelligence

if __name__ == "__main__":
    commodity = input("Enter commodity: ").strip()
    result = get_market_intelligence(commodity)
    print(json.dumps(result, indent=2))
