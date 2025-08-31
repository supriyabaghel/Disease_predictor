**🩺 Disease Predictor – AI-Powered Healthcare Assistant**

An AI-powered healthcare web application that predicts diseases based on symptoms, provides recommended doctor specialties, and allows patients to manage their health profile seamlessly.

✨ Features
🧠 Machine Learning Disease Prediction

Trained on a medical dataset using Support Vector Machine (SVM).

Accepts symptoms and predicts the top 5 most likely diseases with probabilities.

Suggests the doctor specialty best suited for consultation.

💻 Frontend (React + Vite + Tailwind + Material UI)

Hero Section with login/signup.

Services Page showcasing app features.

Disease Predictor Window (DpWindow):

Symptom search with autocomplete.

Add/remove symptoms easily.

Prediction results with top 5 diseases + recommended doctor.

Dashboard for patients to manage profile.

Contact Doctor Page listing specialists.

Fully responsive UI with clean design.

⚙️ Backend (Django + Django REST Framework)

APIs for:

User registration & login

Patient profile management

Doctor profiles lookup

Disease prediction via ML model

Integrated CORS headers for React-Django communication.

SQLite/PostgreSQL support.

📂 Project Structure
Application/
├── Backend/                # Django backend
│   ├── Accounts/           # User & patient models, auth
│   ├── DiseasePredictor/   # ML prediction app
│   ├── backend/            # Core backend settings (urls, wsgi, asgi)
│   └── manage.py
│
├── frontend/               # React frontend (Vite)
│   ├── src/assets/components/
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── DpWindow.jsx
│   │   ├── Prediction.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PatientForm.jsx
│   │   ├── PatientProfile.jsx
│   │   └── context.jsx
│   └── main.jsx
│
└── README.md
Hero.jsx
<img width="861" height="599" alt="image" src="https://github.com/user-attachments/assets/0bf17bfc-5d62-4778-8fe5-0195a16a30bb" />
Prediction.jsx
<img width="832" height="412" alt="image" src="https://github.com/user-attachments/assets/0ff934a0-c863-46ac-8110-f335fe7b91c3" />
DoctorProfile.jsx
<img width="858" height="526" alt="image" src="https://github.com/user-attachments/assets/cd6328b9-b135-4cf4-9066-c341a848b343" />
🔮 Future Enhancements

Chatbot integration for healthcare Q&A.

Appointment booking with doctors.

Multi-language support.

Deploy to cloud (AWS/GCP/Heroku).

👩‍💻 Author

Supriya Baghel

⚡ "Access Quality Healthcare Assistance Anytime, Anywhere!"


