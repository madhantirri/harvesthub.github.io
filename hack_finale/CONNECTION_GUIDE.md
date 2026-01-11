# 🔗 Frontend-Backend Connection Guide

This guide explains how to connect the **Frontend** (`autonomous hacks !` folder) with the **Backend** (`GDG` folder) for the HarvestHub AI project.

---

## 📋 **Prerequisites**

Before connecting, ensure you have:

1. **Python 3.8+** installed
2. **pip** (Python package manager)
3. **Web browser** (Chrome, Firefox, Edge, etc.)
4. **Text editor** or IDE (VS Code recommended)

---

## 🚀 **Step-by-Step Connection Guide**

### **Step 1: Install Backend Dependencies**

1. Open a terminal/command prompt
2. Navigate to the `GDG` folder:
   ```bash
   cd GDG
   ```

3. (Optional) Activate virtual environment if you have one:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

4. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

   This will install:
   - Flask (web framework)
   - flask-cors (CORS support)
   - pandas, numpy, scikit-learn (ML libraries)
   - xgboost (ML model)
   - Other dependencies

---

### **Step 2: Start the Backend Server**

1. Make sure you're in the `GDG` folder
2. Run the Flask server:
   ```bash
   python app.py
   ```

3. You should see output like:
   ```
   🚀 Starting HarvestHub AI Backend API...
   📍 Server running on http://0.0.0.0:5000
   📡 API endpoint: http://localhost:5000/api/predict
   💡 Health check: http://localhost:5000/api/health
   * Running on http://127.0.0.1:5000
   ```

4. **Keep this terminal window open** - the server must be running for the frontend to work!

---

### **Step 3: Verify Backend is Running**

Open your browser and visit:
- **Health Check**: http://localhost:5000/api/health
- **Home**: http://localhost:5000/

You should see JSON responses confirming the server is running.

---

### **Step 4: Open the Frontend**

1. Navigate to the `autonomous hacks !` folder
2. Open `index.html` in your web browser:
   - **Option 1**: Double-click `index.html`
   - **Option 2**: Right-click → Open with → Browser
   - **Option 3**: Drag and drop into browser

3. You should see the HarvestHub AI homepage

---

### **Step 5: Test the Connection**

1. Click on **"Predict Price"** or navigate to `predict.html`
2. Fill in the form:
   - Select a crop (Rice, Wheat, Banana, or Coconut)
   - Select a region
   - Enter expected yield
3. Click **"Predict Crop Price"**
4. The frontend will call the backend API and display real predictions!

---

## 🔧 **Configuration**

### **Changing Backend Port**

If port 5000 is already in use, you can change it:

1. Edit `GDG/app.py`
2. Find this line:
   ```python
   PORT = 5000
   ```
3. Change to your desired port (e.g., `5001`, `8000`)
4. Update the frontend API URL in `autonomous hacks !/predict-script.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5001';  // Match your port
   ```

### **Changing Backend Host**

If your backend is on a different machine:

1. Edit `GDG/app.py`:
   ```python
   HOST = '0.0.0.0'  # Already set to accept connections from any IP
   ```

2. Update frontend API URL in `autonomous hacks !/predict-script.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_SERVER_IP:5000';
   // Example: 'http://192.168.1.100:5000'
   ```

---

## 🐛 **Troubleshooting**

### **Problem: "Failed to get prediction" error**

**Solution:**
- Make sure the backend server is running (Step 2)
- Check that the API URL in `predict-script.js` matches your backend port
- Open browser console (F12) to see detailed error messages
- Verify backend is accessible: http://localhost:5000/api/health

### **Problem: CORS errors in browser console**

**Solution:**
- The backend already has CORS enabled (`flask-cors`)
- If you still see CORS errors, make sure `flask-cors` is installed:
  ```bash
  pip install flask-cors
  ```

### **Problem: "Module not found" error when starting backend**

**Solution:**
- Install missing dependencies:
  ```bash
  pip install -r requirements.txt
  ```
- Make sure you're in the `GDG` folder when running `pip install`

### **Problem: Port 5000 already in use**

**Solution:**
- Change the port in `GDG/app.py` (see Configuration section above)
- Or stop the application using port 5000

### **Problem: Frontend shows old static data**

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh the page (Ctrl+F5)
- Make sure you're using the updated `predict-script.js` file

---

## 📡 **API Endpoints**

The backend provides these endpoints:

### **1. Health Check**
```
GET http://localhost:5000/api/health
```
Returns server status.

### **2. Get Commodities List**
```
GET http://localhost:5000/api/commodities
```
Returns list of available crops.

### **3. Predict Price** (Main endpoint)
```
POST http://localhost:5000/api/predict
Content-Type: application/json

{
  "commodity": "Rice"
}
```

**Response:**
```json
{
  "commodity": "Rice",
  "generated_on": "2026-01-10T23:02:27.740192",
  "forecast_7_days": {
    "day_1": 2850.75,
    "day_2": 2845.20,
    ...
  },
  "confidence_band": {
    "lower_bound": 2650.00,
    "upper_bound": 3050.00,
    "volatility_level": "low"
  },
  "statistics": {
    "last_price": 2855.40,
    "weekly_change_pct": -0.85
  },
  "historical_comparison": {
    "vs_last_week_pct": -0.85,
    "vs_last_year_pct": 5.30
  },
  "seasonal_outlook": {
    "trend": "neutral",
    "time_horizon": "4–8 weeks",
    "reason": "Balanced supply and demand..."
  }
}
```

---

## 🏗️ **Project Structure**

```
hack_finale/
│
├── GDG/                          # BACKEND (Python/Flask)
│   ├── app.py                    # Flask API server (NEW)
│   ├── requirements.txt          # Python dependencies
│   ├── backend/
│   │   ├── intelligence.py       # ML prediction engine
│   │   └── ...
│   ├── models/                   # Trained ML models (.pkl files)
│   │   ├── Rice.pkl
│   │   ├── Wheat.pkl
│   │   ├── Banana.pkl
│   │   └── Coconut.pkl
│   └── data/
│       └── Agriculture_Dataset_2020_2026.xlsx
│
└── autonomous hacks !/           # FRONTEND (HTML/JS)
    ├── index.html                # Homepage
    ├── predict.html              # Prediction page
    ├── predict-script.js          # Frontend logic (UPDATED)
    ├── script.js                 # General scripts
    └── style.css                 # Styling
```

---

## 🔄 **How It Works**

1. **User fills form** in `predict.html`
2. **Frontend JavaScript** (`predict-script.js`) sends POST request to backend
3. **Backend API** (`app.py`) receives request
4. **ML Engine** (`intelligence.py`) loads model and generates prediction
5. **Backend returns** JSON response with predictions
6. **Frontend displays** results with charts and analysis

---

## ✅ **Quick Start Checklist**

- [ ] Python 3.8+ installed
- [ ] Navigated to `GDG` folder
- [ ] Installed dependencies: `pip install -r requirements.txt`
- [ ] Started backend: `python app.py`
- [ ] Verified backend: http://localhost:5000/api/health
- [ ] Opened frontend: `autonomous hacks !/index.html`
- [ ] Tested prediction: Selected crop and clicked "Predict"

---

## 🎯 **Next Steps**

Once connected:

1. **Test all crops**: Try predicting prices for Rice, Wheat, Banana, and Coconut
2. **Try different regions**: See how regional adjustments affect predictions
3. **Check predictions**: Compare AI predictions with actual market trends
4. **Customize**: Modify multipliers, add new features, or extend the API

---

## 📞 **Support**

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Verify backend logs in the terminal
3. Check browser console (F12) for frontend errors
4. Ensure all dependencies are installed correctly

---

## 🎉 **You're All Set!**

Your frontend and backend are now connected! The frontend will fetch real-time predictions from your ML models in the backend.

**Happy Predicting! 🌾**

