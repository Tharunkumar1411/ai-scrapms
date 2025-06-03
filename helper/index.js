const axios = require("axios");

const GEMINI_API_KEY = 'AIzaSyC3oD0I-kqklFr-9tEFH3sbJpCEYtU4Ebw'; // Replace with your real key or use env variable

async function queryGemini(prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const res = await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || '[empty response]';
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    throw err;
  }
}

const getPrompt = (text) => {
    return `You are an AI summarizer. Your job is to read a raw HTML content string and return a structured JSON summary in the following format. The input text may come from news articles, blogs, product pages, documentation, or informational websites. And summary should must be long enough not short likewise summay points also keep in mind

        Strictly return only the JSON object without any markdown formatting
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

        Input text: ${text}`
}

function extractJSON(rawText) {
  const match = rawText.match(/{[\s\S]*}/);
  if (!match) throw new Error("No JSON found in response");
  return JSON.parse(match[0]);
}


module.exports = {
    queryGemini,
    getPrompt,
    extractJSON
};