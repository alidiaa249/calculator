# 🧮 Calculator App

A full-stack calculator application built with **Angular** (frontend) and **Node.js/Express** (backend), containerized with **Docker** and orchestrated with **docker-compose**.

---

## 📁 Project Structure

```
calculator-app/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── index.js          # Express server & routes
│   │   └── calculator.js     # Calculator logic module
│   ├── tests/
│   │   ├── calculator.test.js  # Unit tests (Jest)
│   │   └── api.test.js         # Integration tests (Supertest)
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                 # Angular application
│   ├── src/
│   │   └── app/
│   │       ├── components/calculator/
│   │       │   ├── calculator.component.ts
│   │       │   ├── calculator.component.html
│   │       │   ├── calculator.component.css
│   │       │   └── calculator.component.spec.ts  # Unit tests (Karma/Jasmine)
│   │       └── services/
│   │           └── calculator.service.ts
│   ├── Dockerfile            # Multi-stage build + Nginx
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml        # Multi-container orchestration
└── README.md
```

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Build and start all containers
docker-compose up --build

# App is available at:
# Frontend → http://localhost:80
# Backend  → http://localhost:3000
```

### Option 2: Local Development

```bash
# Backend
cd backend
npm install
npm start          # Runs on http://localhost:3000

# Frontend (new terminal)
cd frontend
npm install
ng serve           # Runs on http://localhost:4200
```

---

## ✅ Running Tests

### Backend Tests (Jest)
```bash
cd backend
npm install
npm test
```

Expected output:
```
PASS tests/calculator.test.js
PASS tests/api.test.js

Test Suites: 2 passed
Tests:       19 passed
```

### Frontend Tests (Karma/Jasmine)
```bash
cd frontend
npm install
npm run test:ci
```

---

## 🐳 Docker Details

### Services

| Service    | Image         | Port | Description              |
|------------|---------------|------|--------------------------|
| `backend`  | node:20-alpine| 3000 | Express REST API         |
| `frontend` | nginx:alpine  | 80   | Angular app via Nginx    |

### Useful Commands

```bash
# Start in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all containers
docker-compose down

# Rebuild a single service
docker-compose up --build backend
```

---

## 🔌 API Endpoints

### `GET /health`
Returns API status.

### `POST /calculate`
Performs a calculation.

**Request Body:**
```json
{
  "a": 10,
  "b": 5,
  "operation": "add"
}
```

**Supported operations:** `add`, `subtract`, `multiply`, `divide`, `percentage`

**Response:**
```json
{
  "result": 15,
  "operation": "add",
  "a": 10,
  "b": 5
}
```

---

## 🧪 Unit Testing Coverage

### Backend (Jest)
- `calculator.js` — add, subtract, multiply, divide, percentage
- `index.js` (API) — all routes, error cases, edge cases

### Frontend (Karma/Jasmine)
- `CalculatorComponent` — digit input, operators, equals, clear, backspace, sign toggle, percentage, division by zero

---

## 🛠 Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | Angular 17 (Standalone) |
| Backend    | Node.js + Express       |
| Testing    | Jest, Supertest, Karma/Jasmine |
| Container  | Docker                  |
| Orchestration | docker-compose       |
| Web Server | Nginx (Alpine)          |
"# calculator" 
"# calculator" 
"# calculator" 
