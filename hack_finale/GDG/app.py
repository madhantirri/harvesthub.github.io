"""
Flask API Server for HarvestHub AI Backend
Connects the frontend to the ML prediction engine
"""

from flask import Flask, jsonify, request, render_template_string
from flask_cors import CORS
from backend.intelligence import get_market_intelligence
from backend.commitments import create_commitment
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
PORT = 5000
HOST = '0.0.0.0'  # Allow connections from any IP

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "success",
        "message": "HarvestHub AI Backend API is running",
        "version": "1.0.0"
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Predict crop price based on commodity name
    
    Request body:
    {
        "commodity": "Rice"  # or "Wheat", "Banana", "Coconut"
    }
    
    Returns:
    {
        "commodity": "Rice",
        "generated_on": "2026-01-10T23:02:27.740192",
        "forecast_7_days": {...},
        "confidence_band": {...},
        "statistics": {...},
        "historical_comparison": {...},
        "drivers": {...},
        "alerts": [...],
        "seasonal_outlook": {...}
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'commodity' not in data:
            return jsonify({
                "error": "Missing 'commodity' field in request body"
            }), 400
        
        commodity = data['commodity'].strip()
        
        # Validate commodity
        valid_commodities = ['Rice', 'Wheat', 'Banana', 'Coconut']
        if commodity not in valid_commodities:
            return jsonify({
                "error": f"Invalid commodity. Must be one of: {', '.join(valid_commodities)}"
            }), 400
        
        # Get prediction from ML engine
        result = get_market_intelligence(commodity)
        
        # Check for errors
        if 'error' in result:
            return jsonify(result), 400
        
        # Add statistics field for frontend compatibility
        if 'statistics' not in result:
            result['statistics'] = {
                "last_price": result.get('forecast_7_days', {}).get('day_1', 0),
                "weekly_change_pct": result.get('historical_comparison', {}).get('vs_last_week_pct', 0)
            }
        
        # Add drivers and alerts if not present (for compatibility)
        if 'drivers' not in result:
            result['drivers'] = {
                "positive": [],
                "negative": []
            }
        
        if 'alerts' not in result:
            result['alerts'] = []
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

@app.route('/api/commodities', methods=['GET'])
def get_commodities():
    """Get list of available commodities"""
    return jsonify({
        "commodities": ['Rice', 'Wheat', 'Banana', 'Coconut'],
        "count": 4
    }), 200

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "HarvestHub AI Backend"
    }), 200

# Commitment form HTML
HTML_FORM = """
<!DOCTYPE html>
<html>
<head>
    <title>AI Crop Price Advisory - Activate Monitoring</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h2 {
            color: #2ecc71;
        }
        form {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
            color: #333;
        }
        select, input[type="number"], input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            background: #2ecc71;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
        }
        button:hover {
            background: #27ae60;
        }
        .success {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #2ecc71;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h2>🌾 AI Crop Price Advisory</h2>
    <form method="POST">
        <label>Commodity:</label>
        <select name="commodity" required>
            <option value="">-- Select Crop --</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Banana">Banana</option>
            <option value="Coconut">Coconut</option>
        </select>

        <label>Minimum Price (₹):</label>
        <input type="number" name="min_price" step="0.01" required placeholder="e.g., 2500">

        <label>Quantity (Quintal):</label>
        <input type="number" name="quantity" required placeholder="e.g., 20">

        <label>Phone Number:</label>
        <input type="text" name="phone" required placeholder="+91XXXXXXXXXX">

        <button type="submit">✅ Activate AI Monitoring</button>
    </form>
    <a href="/" class="back-link">← Back to API</a>
</body>
</html>
"""

@app.route('/commitment', methods=['GET', 'POST'])
def commitment_form():
    """Commitment form page for activating AI monitoring"""
    if request.method == "POST":
        try:
            commodity = request.form["commodity"]
            min_price = float(request.form["min_price"])
            quantity = int(request.form["quantity"])
            phone = request.form["phone"]

            result = create_commitment(
                user_phone=phone,
                commodity=commodity,
                quantity=quantity
            )

            return f"""
            <div class="success">
                <h3>✅ AI Monitoring Activated Successfully!</h3>
                <p><strong>Commitment ID:</strong> {result['commit_id']}</p>
                <p><strong>Commodity:</strong> {commodity}</p>
                <p><strong>Entry Price:</strong> ₹{result['entry_price']:.2f}</p>
                <p><strong>Minimum Price:</strong> ₹{min_price:.2f}</p>
                <p><strong>Quantity:</strong> {quantity} quintals</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Status:</strong> {result['status']}</p>
                <p style="margin-top: 20px; color: #27ae60;">
                    🎉 Your crop is now being monitored by AI. You will receive alerts when it's time to sell!
                </p>
                <a href="/commitment" class="back-link">Create Another Commitment</a>
            </div>
            """
        except Exception as e:
            return f"""
            <div class="success" style="border-left: 4px solid #e74c3c;">
                <h3>❌ Error</h3>
                <p>Failed to create commitment: {str(e)}</p>
                <a href="/commitment" class="back-link">Try Again</a>
            </div>
            """

    return render_template_string(HTML_FORM)

if __name__ == '__main__':
    print(f"🚀 Starting HarvestHub AI Backend API...")
    print(f"📍 Server running on http://{HOST}:{PORT}")
    print(f"📡 API endpoint: http://localhost:{PORT}/api/predict")
    print(f"💡 Health check: http://localhost:{PORT}/api/health")
    print(f"📝 Commitment form: http://localhost:{PORT}/commitment")
    app.run(host=HOST, port=PORT, debug=True)

