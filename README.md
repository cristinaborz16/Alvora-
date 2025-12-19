# Alvora - Student Academic Collaboration Platform / Platformă de Colaborare Academică pentru Studenți

[English](#english) | [Română](#română)

---

<a name="english"></a>
## 🇬🇧 English

### Overview
Alvora is a web platform designed to connect university students for forming study groups, finding tutors, and facilitating academic collaboration within the university.

### 🚀 Deployment Status

- **Frontend**: Deployed on **Vercel**
- **Backend**: Deployed on **Render** (as a Web Service)
- **Database**: **MongoDB Atlas**
- **File Storage**: **Cloudinary**

The project is configured for **Continuous Deployment (CD)**. Pushing to the `main` branch automatically triggers new builds on both Vercel and Render.

### 🛠 Project Structure

```
Alvora/
├── frontend/         # React + Vite + Tailwind CSS
│   ├── src/          # Source code
│   └── public/       # Static assets
└── backend/          # Node.js + Express + MongoDB
    ├── models/       # Database schemas
    ├── routes/       # API endpoints
    └── server.js     # Entry point
```

### 💻 Local Development Setup

#### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB installed locally or an Atlas connection string
- Cloudinary account for file uploads

#### 1. Clone the Repository
```bash
git clone https://github.com/cristinaborz16/Alvora-.git
cd Alvora-
```

#### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   INSTITUTION_DOMAIN=@stud.rau.ro # Optional: limit registration to specific email domains
   
   # Cloudinary Configuration (for file uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

#### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder:
   ```env
   # Point this to your local backend during development
   VITE_API_BASE_URL=http://localhost:5001/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### ☁️ Deployment Configuration

#### Backend (Render)
- **Type**: Web Service
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js` (or `npm start`)
- **Environment Variables**:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLOUDINARY_...` (all 3 keys)
  - `PORT`: `10000` (Render default)

#### Frontend (Vercel)
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_BASE_URL`: `https://alvora-backend.onrender.com/api`

---

<a name="română"></a>
## 🇷🇴 Română

### Prezentare Generală
Alvora este o platformă web dedicată studenților, concepută pentru a facilita formarea grupurilor de studiu, găsirea de tutori și colaborarea academică în cadrul universității.

### 🚀 Status Deployed

- **Frontend**: Deployed pe **Vercel**
- **Backend**: Deployed pe **Render** (ca Web Service)
- **Bază de date**: **MongoDB Atlas**
- **Stocare fișiere**: **Cloudinary**

Proiectul este configurat pentru **Continuous Deployment (CD)**. Orice push pe branch-ul `main` declanșează automat build-uri noi atât pe Vercel, cât și pe Render.

### 🛠 Structura Proiectului

```
Alvora/
├── frontend/         # React + Vite + Tailwind CSS
│   ├── src/          # Cod sursă
│   └── public/       # Fișiere statice
└── backend/          # Node.js + Express + MongoDB
    ├── models/       # Scheme bază de date
    ├── routes/       # API endpoints
    └── server.js     # Entry point
```

### 💻 Configurare Locală

#### Cerințe preliminare
- Node.js (v18 sau mai nou)
- MongoDB instalat local sau un connection string de la Atlas
- Cont Cloudinary pentru încărcarea fișierelor

#### 1. Clonare Repository
```bash
git clone https://github.com/cristinaborz16/Alvora-.git
cd Alvora-
```

#### 2. Configurare Backend
1. Navighează în folderul backend:
   ```bash
   cd backend
   ```
2. Instalează dependențele:
   ```bash
   npm install
   ```
3. Creează un fișier `.env` în folderul `backend` cu următoarele variabile:
   ```env
   PORT=5001
   MONGO_URI=...
   JWT_SECRET=...
   INSTITUTION_DOMAIN=@stud.rau.ro
   
   # Configurare Cloudinary (pentru upload fișiere)
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```
4. Pornește serverul:
   ```bash
   npm run dev
   ```

#### 3. Configurare Frontend
1. Navighează în folderul frontend:
   ```bash
   cd frontend
   ```
2. Instalează dependențele:
   ```bash
   npm install
   ```
3. Creează un fișier `.env` în folderul `frontend`:
   ```env
   # Pentru development local, folosește URL-ul serverului local
   VITE_API_BASE_URL=http://localhost:5001/api
   ```
4. Pornește serverul de development:
   ```bash
   npm run dev
   ```

### ☁️ Configurare Deployment

#### Backend (Render)
- **Tip**: Web Service
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js` (sau `npm start`)
- **Environment Variables**:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLOUDINARY_...` (cele 3 chei)
  - `PORT`: `10000` (default Render)

#### Frontend (Vercel)
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_BASE_URL`: `https://alvora-backend.onrender.com/api`

### 📝 Funcționalități

- **Autentificare**: Înregistrare cu email/parolă restricționată la domeniul instituțional.
- **Profiluri**: Vizualizare profiluri studenți și detalii despre facultate.
- **Grupuri de Studiu**: Creare, alăturare și gestionare grupuri.
- **Chat**: Mesagerie în timp real în cadrul grupurilor.
- **Partajare Fișiere**: Upload imagini, PDF-uri și documente în chat (via Cloudinary).
- **Grupurile Mele**: Acces rapid la toate grupurile din care faci parte.
