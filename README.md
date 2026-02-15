# 📊 CSV Insights Dashboard

An AI-powered CSV analytics dashboard built with a production-grade backend and a premium SaaS-style frontend.

Upload a CSV file, generate structured insights using Gemini AI, explore visual charts, ask follow-up questions, and monitor system health — all in a scalable, memory-safe architecture.

## 🚀 Tech Stack

### Frontend

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **Recharts**
- **Framer Motion**
- **Axios**

### Backend (Primary Focus)

- **Node.js + Express**
- **MongoDB** (Mongoose)
- **Gemini 1.5 Flash** (Google Generative AI)
- **Cloudinary** (raw file storage)
- **Multer** (memory-based upload)
- **In-memory caching system**
- **Custom concurrency & memory guards**

---

## 🧠 Backend Architecture (Core Strength)

The backend was designed with scalability, stability, and token efficiency in mind.

### 1. Streaming CSV Processing (Memory Safe)

Instead of loading full CSV into memory:

- CSV is parsed using stream-based processing.
- Only incremental statistics are calculated.
- No large arrays stored in memory.
- Prevents memory spikes on large files.
- Ensures server stability even with multiple simultaneous large uploads.

### 2. Gemini 1.5 Flash with Multi-API Key Rotation

**Why Multiple API Keys?**
Gemini free-tier APIs have rate limits, token limits, and quota exhaustion. A single key would cause service interruption.

**Solution Implemented:**

- `GEMINI_KEYS` environment variable (comma-separated keys).
- Automatic key rotation system.
- **Failover logic:** If key 1 hits quota → try key 2 → try key 3 → continue until success.
- Safe fallback response if all keys fail.
- Ensures high availability and resilience under heavy usage.

### 3. AI Token Optimization

To reduce Gemini usage:

- Only dataset metadata is sent (not full CSV).
- Prompt is structured & concise.
- AI responses are cached (in-memory).
- Repeated prompts do not trigger new AI calls.

### 4. In-Memory AI Caching System

Custom cache layer implemented:

- Uses JavaScript `Map`.
- **TTL-based expiration** (10 minutes).
- Max cache size control.
- Prevents duplicate AI calls for initial insights and follow-up questions.
- Improves speed and cost efficiency.

### 5. AI Rate Guard (Per IP Protection)

- Each IP is limited to X AI requests per minute.
- Exceeding limit returns **HTTP 429**.
- Protects Gemini keys from abuse/exhaustion.

### 6. Upload Concurrency Guard

- Maximum concurrent CSV processing limit enforced.
- If exceeded → returns **HTTP 503**.
- Prevents CPU overload and server crashes during upload spikes.

### 7. Memory Guard System

Server monitors heap usage:

- If memory exceeds threshold → heavy routes (like upload) are blocked.
- Protects against **Out-of-Memory (OOM)** crashes.

### 8. Production-Grade Error Handling

- Centralized global error middleware.
- Custom `AppError` class.
- Async wrapper for all controllers.
- Graceful shutdown handling & unhandled rejection protection.
- Structured JSON error responses.

### 9. Health & Status Monitoring

`/api/status` endpoint checks:

- Server status, MongoDB connection, Gemini connectivity, Cloudinary connectivity, Memory usage, and Uptime.
- Designed for monitoring and DevOps readiness.

---

## 📁 Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    server.js
    app.js

frontend/
  src/
    app/
    components/
    lib/
    hooks/
```

---

## 📌 Features

- **CSV Upload:** 5MB limit, validated.
- **Streaming Parser:** Memory-safe CSV analysis.
- **AI Insights:** Automated data storytelling.
- **Follow-up Q&A:** Interactive AI data exploration.
- **History:** Last 5 reports stored.
- **Visualizations:** Interactive charts.
- **Status Page:** Real-time system monitoring.
- **Premium UI:** Dark mode, smooth animations, and toast notifications.

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_uri

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

GEMINI_KEYS=key1,key2,key3,key4
```

---

## 🛠 How to Run

### Clone the Repository

```bash
git clone https://github.com/the-y0gi/csv-ai.git
cd csv-ai
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:3000`

---

## 👨‍💻 Author

**Yogesh Gadhewal**
Full-Stack Developer
Focused on scalable backend systems and AI-integrated applications.
