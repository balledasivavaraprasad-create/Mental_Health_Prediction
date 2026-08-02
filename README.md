# Mental Health Predictor 🧠📊

A machine learning web application designed to analyze student lifestyle habits—such as social media usage, phone unlocks, sleep patterns, physical activity, and academic stress—and predict their overall mental health score.

---

## 📂 Project Structure

```text
Mental_Health_Prediction/
├── frontend/                                # Frontend web application (Vercel Ready)
│   ├── index.html                           # Main web layout
│   ├── style.css                            # Glassmorphism dark mode stylesheet
│   ├── app.js                               # Form handling & API fetch logic
│   └── vercel.json                          # Vercel deployment configuration
├── main.py                                  # FastAPI server & model inference endpoints
├── Procfile                                 # Render deployment command
├── render.yaml                              # Render web service configuration
├── Mental_Health_Prediction.pkl             # Serialized Scikit-Learn Pipeline
├── Mental_Health_Prediction.ipynb           # Model training & EDA Jupyter Notebook
├── Student Social Media And Mental Health Impact.csv # Dataset
├── requirements.txt                         # Python dependencies for backend
└── README.md                                # Project documentation
```

---

## 🚀 Deployment Guide

### ☁️ 1. Deploy Backend to Render
1. Sign in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository (`Mental_Health_Prediction`).
4. Set the following settings:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**. Your backend API will be live!

---

### 🌐 2. Deploy Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import this GitHub repository (`Mental_Health_Prediction`).
3. Set the **Root Directory** to `frontend`.
4. Click **Deploy**!

---

## 🐍 Local Development Setup

1. Clone the repository and install backend dependencies:
```bash
git clone https://github.com/balledasivavaraprasad-create/Mental_Health_Prediction.git
cd Mental_Health_Prediction
pip install -r requirements.txt
```

2. Start FastAPI backend server:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

3. Launch frontend web server:
```bash
cd frontend
python3 -m http.server 8080
```
Navigate to `http://127.0.0.1:8080` in your web browser.

---

## 📡 API Endpoint Reference

### `POST /predict`

**Request Headers:** `Content-Type: application/json`

**Sample Request Body:**
```json
{
  "Age": 21,
  "Gender": "Female",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "Instagram",
  "Purpose_Of_Use": "Entertainment",
  "Avg_Daily_Usage_Hours": 5.5,
  "Daily_Unlocks": 85,
  "Study_Hours": 4.0,
  "Physical_Activity_Hours": 1.0,
  "Sleep_Hours_Per_Night": 6.5,
  "Stress_Level": "High"
}
```

**Sample Response:**
```json
{
  "predicted_mental_health_score": 5.74,
  "risk_level": "Moderate Risk",
  "status": "success"
}
```

---

## 📄 License
This project is open-source under the MIT License.
