# Overview

This project integrates **AI (Gemini 2.5 Flash)** into a CSV analytics system to generate structured insights and allow intelligent follow-up questions.

AI was used as a tool for:

- Insight generation  
- Analytical reasoning over dataset metadata  
- Follow-up question answering  

The AI layer was designed with **resilience, token efficiency, and failover handling**.

---

## 🔹 LLM Used

- **Model:** Gemini 2.5 Flash  
- **Provider:** Google Generative AI  

### Why Gemini 2.5 Flash?

- Fast response time  
- Suitable for structured analytical prompts  
- Free-tier availability  
- Lower latency compared to heavier models  

---

## 🔹 Multi-API Key Strategy

Free-tier Gemini keys have:

- Rate limits  
- Token limits  
- Quota exhaustion  

To ensure high availability:

- Multiple API keys are stored in `GEMINI_KEYS`  
- Automatic failover system rotates keys  
- If one key hits quota → next key is used  
- If all keys fail → safe fallback response returned  

This ensures system continuity under load.

---

## 🔹 Token Optimization Strategy

To reduce token consumption:

- Full CSV data is **NEVER** sent to AI  
- Only structured metadata (row count, column stats) is sent  
- Prompts are concise and structured  
- Responses are cached (in-memory)  

---

## 🔹 AI Caching System

An in-memory cache was implemented to:

- Avoid duplicate AI calls  
- Reduce token usage  
- Improve response time  
- Reduce API cost  

TTL-based expiration ensures freshness.

---

## 🔹 Prompt Safety

To prevent misuse:

- Follow-up prompts restrict AI to provided dataset summary  
- Instructions limit scope of response  
- AI is not allowed to access external context  

---

## 🔹 What Was Verified Manually

- CSV parsing correctness  
- Memory usage safety  
- Concurrency handling  
- AI failover logic  
- Error handling stability  

AI was used as a **reasoning assistant — not as a replacement for backend logic**.

---

## 🔹 Limitations

- In-memory caching does not persist across restarts  
- No distributed cache (Redis not used)  
- No async job queue yet  
- No multi-user authentication  

These can be extended in future iterations.
