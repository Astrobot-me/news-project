# News Project

Comprehensive TypeScript Full-Stack Application

This repository contains both the **backend (Node.js + TypeScript)** and the **frontend (Vite + TypeScript)**. Each component is isolated within its own directory and can be built, run, and deployed independently.

---


# Credentials 
- email : `test@adya.ai`
- password : `12345`

# Table of Contents

1. Backend

   * Prerequisites
   * Project Structure
   * Setup and Installation
   * Available Scripts
   * AI Tools Used
   * Deployment Steps

2. Frontend

   * Prerequisites
   * Project Structure
   * Setup and Installation
   * Available Scripts
   * Deployment Steps

---

# 1. Backend (Node.js + TypeScript)

## 1.1 Prerequisites

Ensure the following tools are installed:

* Node.js (v20+)
* npm or yarn
* TypeScript (auto-installed during build)

---

## 1.2 Setup and Installation

```bash
cd backend
npm install
```

If TypeScript is not installed globally, the build script will automatically install it locally.

---

## 1.4 Available Scripts

The `package.json` contains the following scripts:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "npm install typescript && npx tsc --build",
  "dev": "npx tsc --build && node dist/index"
}
```

### Script Definitions

| Script          | Description                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------- |
| `npm run build` | Installs TypeScript locally (if missing) and compiles the TypeScript project using `tsc --build`. |
| `npm run dev`   | Builds the project and starts the compiled Node server from `dist/index`.                         |
| `npm test`      | Placeholder test script.                                                                          |

---

## 1.5 AI Tools Used

Document any AI tools leveraged in backend development, such as:

* V0 Vercel for UI Help  


## 1.6 Deployment Steps

### **Local Deployment**

```bash
npm run build
node dist/index.js
```

# 2. Frontend (Vite + TypeScript)

## 2.1 Prerequisites

Install:

* Node.js (v20+)
* npm or yarn
* Vite (installed via project dependencies)
* TypeScript (configured via tsconfig)

---

## 2.2 Setup and Installation

```bash
cd frontend
npm install
```

---

## 2.4 Available Scripts

The `package.json` includes:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### Script Definitions

| Script            | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| `npm run dev`     | Starts Vite in development mode with hot-reload.                                  |
| `npm run build`   | Runs TypeScript build (`tsc -b`) and produces an optimized Vite production build. |
| `npm run lint`    | Executes ESLint across the project.                                               |
| `npm run preview` | Serves the production build locally for verification.                             |

---

## 2.5 Deployment Steps

### **Local Preview**

```bash
npm run build

```

### **Static Host Deployment (Netlify, Vercel, GitHub Pages, Firebase Hosting)**

1. Build the frontend:

   ```bash
   npm run build
   ```
2. Deploy the generated `dist/` folder to your hosting provider.


* Ensure environment variables are maintained in `.env` files (not committed).

