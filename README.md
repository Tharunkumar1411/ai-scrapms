Here’s a **complete `README.md`** content tailored for your project — it explains:

* Project functionality
* Ollama integration (local only)
* Reason for not using OpenAI
* Setup instructions
* Future scope

---

````markdown
# 🔍 AI-Powered Web Page Summarizer (React + Node.js + Ollama)

This project allows users to input **any public URL** and receive a **clean, structured summary** of the page content using **open-source LLMs**.

The frontend is built with **React** (Notion-style interface), and the backend uses **Node.js** to scrape and process web content. The summarization is done using a **local Ollama-hosted LLM model** such as `mistral` or `llama3`.

---

## 🚀 Features

- ✅ Input any public URL (news, blog, docs, etc.)
- ✅ Scrapes content and extracts clean text using Cheerio or Puppeteer
- ✅ Summarizes content using **open-source LLMs** (via Ollama)
- ✅ Returns structured JSON with:
  - Page title
  - Summary
  - Key points
  - Per-point expanded content
  - Topics
  - Source URL & metadata
- ✅ Displayed in a React frontend (Notion-like table with filtering/search)

---

## 🧠 Why Ollama (and not OpenAI)?

While OpenAI offers easy-to-integrate APIs, it is:

- 💵 Paid
- 🌐 Dependent on external services
- 🛑 Not always customizable or offline-friendly

To ensure:
- 🆓 Zero cost
- ✅ Full local control
- 🔐 Offline capability

We use **Ollama** — an open-source LLM runner that can load models like `mistral`, `llama3`, etc., **locally**.

---

## ⚙️ Project Setup

### 🖥 Requirements

- Node.js (v16+)
- Ollama installed locally
- A downloaded GGUF-compatible model (e.g., `mistral`)

### 📦 Backend Setup

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend

npm install
````

### ▶️ Start Ollama

```bash
ollama run mistral
```

> ℹ️ Ollama runs on `http://localhost:11434` by default. Your Node.js server connects to this API for summarization.

### ▶️ Start the backend

```bash
node server.js
```

### 🧪 Sample Endpoint

```http
GET /summarize?url=https://www.bbc.com/news/technology&mode=dynamic
```

---

## 🌐 Note on Hosting

Currently, this project supports **local execution only** due to:

* Ollama’s limitation of not being cloud-deployable out-of-the-box (requires GPU/CLI session)
* No secure and scalable production-ready hosting method for Ollama yet

If you wish to run this project:

* Install [Ollama](https://ollama.com/)
* Download a model: `ollama pull mistral`
* Keep Ollama running locally (`ollama run mistral`)

---

## 🧩 Optional: OpenAI API (Not Used)

While the backend has a pluggable design to support OpenAI (`gpt-3.5`, `gpt-4`), we have **not used it** because:

* It's a paid service
* This project aims to be fully open-source and offline-first

If you want to enable OpenAI:

* Replace the summarization block with an API call to `https://api.openai.com/v1/chat/completions`
* Add your OpenAI key in `.env`

---

## 📁 Frontend (React) Setup

*TODO*: Add frontend repo instructions here
(e.g., React app that displays JSON in Notion-style table)

---

## 📌 Future Improvements

* 🌩️ Explore Ollama hosting in Docker/GPU-based cloud instances
* 🌍 Add fallback to OpenAI (when Ollama is not detected)
* 📊 Visual dashboard for LLM performance
* 📝 Summary editing UI

---

## 🤝 Contributing

PRs welcome. If you'd like to add cloud support for Ollama or improve scraping coverage, feel free to fork and submit changes.

---

## 📜 License

MIT

```

---

Let me know if you want this tailored to a multi-folder repo (like `/frontend`, `/backend`), or if you’d like the frontend section auto-filled with table + filter code description.
```