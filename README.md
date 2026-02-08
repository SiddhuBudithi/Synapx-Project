# FNOL Claims Processing Agent (Synapx Assessment)

This project is a **First Notice of Loss (FNOL) Claims Processing Agent** built as part of the Synapx technical assessment.  
The application accepts FNOL documents (PDF/TXT), extracts key claim fields, detects missing information, and recommends an appropriate routing decision.

The goal of the assessment was to demonstrate:
- Full-stack development skills (React + Node.js)
- Clean architecture and separation of concerns
- Practical handling of semi-structured insurance documents (ACORD-style)
- Thoughtful validation and routing logic, similar to real-world FNOL workflows

---

## 🧩 High-Level Architecture

Frontend (React + Tailwind)
|
| multipart/form-data (PDF/TXT upload)
|
Backend (Node.js + Express)
├─ Text normalization
├─ Field extraction (regex + heuristics)
├─ Validation of mandatory FNOL fields
└─ Claim routing recommendation

---

## 🚀 Features Implemented

### Frontend
- Built with **React** and **Tailwind CSS**
- FNOL document upload (PDF / TXT, max 10MB)
- Clear result panel showing:
  - Extracted fields
  - Missing mandatory fields
  - Recommended routing decision
- Synapx-style **Header and Footer** for brand alignment
- Accessible UI (no invalid anchor usage, keyboard-safe dropdown)

### Backend
- Built with **Node.js**, **Express**, and **Multer**
- In-memory file handling (no disk writes)
- PDF parsing using `pdf-parse`
- Modular processing pipeline:
  - `normalize → extract → validate → route`
- Defensive error handling for malformed PDFs
- Realistic FNOL routing logic

---

## 📄 Supported Documents

- `.pdf` (ACORD and ACORD-like FNOL documents)
- `.txt`

> Note: ACORD PDFs are semi-structured.  
> If mandatory fields cannot be confidently extracted, the system intentionally routes the claim to **Manual Review**, which reflects real-world FNOL behavior.

---

## 🛠 Tech Stack

**Frontend**
- React
- Tailwind CSS
- Fetch API

**Backend**
- Node.js
- Express
- Multer
- pdf-parse

---

## 📂 Project Structure

synapx-fnol-agent/
│
├── backend/
│ ├── src/
│ │ ├── core/
│ │ │ ├── normalize.js
│ │ │ ├── extract.js
│ │ │ ├── validate.js
│ │ │ └── route.js
│ │ ├── routes/
│ │ │ └── analyze.js
│ │ └── index.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Header.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── UploadCard.jsx
│ │ │ ├── ResultPanel.jsx
│ │ │ └── FieldTable.jsx
│ │ ├── api.js
│ │ ├── App.js
│ │ └── index.css
│ └── package.json
│
└── README.md

---

## How to Run the Project

### Backend Setup

bash
cd backend
npm install
npm run dev

http://localhost:5000

### Frontend Setup

cd frontend
npm install
npm start
http://localhost:3000

