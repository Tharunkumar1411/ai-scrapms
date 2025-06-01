const axios = require("axios");

async function queryOllama(prompt, model = 'llama3.2') {   
    try {
      const res = await axios.post('http://127.0.0.1:11434/api/generate', {
        model,
        prompt,
        stream: false
      });
  
      return res.data.response || '[empty response]';
    } catch (err) {
      console.error('Ollama error:', err.message);
      throw err;
    }
}

async function warmUpModel(model = 'llama3.2') {
    try {
      const res = await axios.post('http://127.0.0.1:11434/api/generate', {
        model,
        prompt: 'Hello',
        stream: false
      });
  
      if (res.data.done_reason === 'load') {
        console.log("🌀 Model was loading, warm-up complete.");
      } else {
        console.log("✅ Model already warm.");
      }
    } catch (err) {
      console.error("🔥 Error warming up model:", err.message);
    }
}

const getPrompt = (text) => {
    return `You are an AI summarizer. Your job is to read a raw HTML content string and return a structured JSON summary in the following format. The input text may come from news articles, blogs, product pages, documentation, or informational websites. And summary should must be long enough not short likewise summay points also keep in mind

        keep this in mind Return valid JSON only in the format:
        {
        "title": "Main headline or page title (if found)",
        "summary": "A 3-4 sentence concise summary of the page content",
        "key_points": ["Point 1", "Point 2", "Point 3"],
        "summary_for_keypoint" : {
            "Point 1": "Detailed summary for Point 1",
            "Point 2": "Detailed summary for Point 2",
            "Point 3": "Detailed summary for Point 3"
        },
        "topics": ["keyword1", "keyword2", "keyword3"],
        "source_url": "original_url_here",
        "timestamp": "ISO 8601 timestamp (UTC)",
        "reading_time_minutes": estimated_reading_time_in_minutes
        }

        Do not return any commentary or explanation. Return only valid JSON.

        Input text: ${text}
    `
}

module.exports = {
    queryOllama,
    warmUpModel,
    getPrompt
};