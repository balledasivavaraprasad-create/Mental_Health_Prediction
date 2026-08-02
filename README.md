# Mental Health Predictor 🧠📊

A machine learning web application designed to analyze student lifestyle habits—such as social media usage, phone unlocks, sleep patterns, physical activity, and academic stress—and predict their overall mental health score.

The repository is structured with a **FastAPI backend** (Scikit-Learn Random Forest Pipeline) and a standalone **`frontend/`** directory optimized for zero-config deployment on platforms like **Vercel**.

---

## 🌟 Key Features

- **Standalone Frontend (`/frontend`)**: Clean HTML5, CSS3, and JavaScript app tailored for Vercel deployment.
- **Interactive Web Interface**: Dynamic form controls, custom range sliders, preset profiles, and responsive dark mode UI.
- **Real-Time Model Scoring**: Asynchronous fetch requests to the trained Random Forest model (`POST /predict`).
- **Visual Wellbeing Insights**: Displays score progress, risk classification (Low, Moderate, Elevated, High Risk), and specific factor breakdowns.
- **Personalized Action Steps**: Dynamic lifestyle recommendations tailored to user inputs.

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
├── Mental_Health_Prediction.pkl             # Serialized Scikit-Learn Pipeline
├── Mental_Health_Prediction.ipynb           # Model training & EDA Jupyter Notebook
├── Student Social Media And Mental Health Impact.csv # Dataset
├── requirements.txt                         # Python dependencies for backend
├── README.md                                # Project documentation
└── .gitignore                               # Ignored git files
```

---

## 🚀 Deployment & Local Setup

### 🌐 Deploy Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import this GitHub repository (`Mental_Health_Prediction`).
3. Set the **Root Directory** to `frontend`.
4. Click **Deploy**. Vercel will deploy the static site instantly!

---

### 🐍 Local Backend Setup (FastAPI)

1. Clone the repository and install backend dependencies:
```bash
git clone https://github.com/balledasivavaraprasad-create/Mental_Health_Prediction.git
cd Mental_Health_Prediction
pip install -r requirements.txt
```

2. Launch the FastAPI backend:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The API server will run at `http://127.0.0.1:8000`. You can test API endpoints at `http://127.0.0.1:8000/docs`.

3. Launch the Frontend locally:
```bash
cd frontend
python3 -m http.server 8080
```
Open `http://127.0.0.1:8080` in your web browser.

---

## 📡 API Endpoint Reference

### `POST /predict`

**Request Headers:** `Content-Type: application/json`

**Sample Body:**
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
