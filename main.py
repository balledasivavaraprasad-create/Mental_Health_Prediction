import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware

model = joblib.load("Mental_Health_Prediction.pkl")

app = FastAPI(
    title="Student Mental Health Score Predictor API",
    description="API for predicting mental health impact scores based on social media habits and lifestyle metrics.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentData(BaseModel):
    Age: int = Field(..., gt=0, le=100)
    Gender: Literal["Male", "Female"]
    Country: str
    Academic_Level: Literal["Undergraduate", "Graduate", "High School"]
    Most_Used_Platform: Literal[
        'Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter',
        'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp',
        'WeChat'
    ]
    Purpose_Of_Use: Literal['Networking', 'Education', 'Entertainment', 'News']
    Avg_Daily_Usage_Hours: float = Field(..., ge=0, le=24)
    Daily_Unlocks: int = Field(..., ge=0)
    Study_Hours: float = Field(..., ge=0, le=24)
    Physical_Activity_Hours: float = Field(..., ge=0, le=24)
    Sleep_Hours_Per_Night: float = Field(..., ge=0, le=24)
    Stress_Level: Literal['Low', 'Medium', 'High', 'Very High']

class PredictionResponse(BaseModel):
    predicted_mental_health_score: float
    risk_level: str
    status: str

top_countries = [
    'Other', 'India', 'USA', 'Canada', 'Australia',
    'UK', 'Germany', 'Turkey', 'Mexico', 'France'
]

@app.get("/")
def greet():
    return {"message": "Mental Health Prediction API is running successfully!"}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: StudentData):
    country_group = data.Country if data.Country in top_countries else "Other"

    input_row = pd.DataFrame([{
        'Age': data.Age,
        'Gender': data.Gender,
        'Country': data.Country,
        'Academic_Level': data.Academic_Level,
        'Most_Used_Platform': data.Most_Used_Platform,
        'Purpose_Of_Use': data.Purpose_Of_Use,
        'Avg_Daily_Usage_Hours': data.Avg_Daily_Usage_Hours,
        'Daily_Unlocks': data.Daily_Unlocks,
        'Study_Hours': data.Study_Hours,
        'Physical_Activity_Hours': data.Physical_Activity_Hours,
        'Sleep_Hours_Per_Night': data.Sleep_Hours_Per_Night,
        'Stress_Level': data.Stress_Level,
        'Grouped_Countries': country_group
    }])

    prediction = model.predict(input_row)[0]
    score = round(float(prediction), 2)

    if score < 5.0:
        risk_level = "Low Risk"
    elif score < 6.5:
        risk_level = "Moderate Risk"
    elif score < 7.5:
        risk_level = "Elevated Risk"
    else:
        risk_level = "High Risk"

    return PredictionResponse(
        predicted_mental_health_score=score,
        risk_level=risk_level,
        status="success"
    )