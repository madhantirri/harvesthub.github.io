# ⚡ Quick Start Guide

## 🚀 **Connect Frontend & Backend in 3 Steps**

### **Step 1: Start Backend**
```bash
cd GDG
pip install -r requirements.txt
python app.py
```

### **Step 2: Open Frontend**
- Open `autonomous hacks !/index.html` in your browser

### **Step 3: Test**
- Click "Predict Price"
- Select a crop and region
- Click "Predict Crop Price"
- See real AI predictions! 🎉

---

## 📝 **What Was Changed**

### ✅ **Backend (GDG folder)**
- ✅ Created `app.py` - Flask API server with CORS
- ✅ Updated `requirements.txt` - Added Flask & flask-cors
- ✅ Fixed indentation in `backend/intelligence.py`

### ✅ **Frontend (autonomous hacks ! folder)**
- ✅ Updated `predict-script.js` - Now calls backend API instead of static data
- ✅ Added error handling for API calls
- ✅ Made code compatible with API response format

### ✅ **Documentation**
- ✅ Created `CONNECTION_GUIDE.md` - Full connection guide
- ✅ Created `QUICK_START.md` - This file

---

## 🔗 **API Connection**

**Frontend → Backend:**
- Frontend calls: `http://localhost:5000/api/predict`
- Backend responds with: Real-time ML predictions

**Default Configuration:**
- Backend Port: `5000`
- API Endpoint: `/api/predict`
- CORS: Enabled (allows frontend to connect)

---

## ⚠️ **Important Notes**

1. **Backend must be running** before using the frontend
2. **Keep the terminal open** where you started the backend
3. **Port 5000** must be available (or change it in `app.py`)
4. **Browser console** (F12) shows connection status

---

## 🐛 **Quick Troubleshooting**

**"Failed to get prediction" error?**
→ Make sure backend is running: `python app.py`

**Port already in use?**
→ Change port in `GDG/app.py` (line 15)

**CORS errors?**
→ Already fixed! Make sure `flask-cors` is installed

---

## 📖 **Full Documentation**

See `CONNECTION_GUIDE.md` for:
- Detailed setup instructions
- Configuration options
- API documentation
- Troubleshooting guide

---

**Ready to go! Start the backend and open the frontend! 🚀**

