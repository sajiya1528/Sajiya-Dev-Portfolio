import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only allow POST request method
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  const { messages } = request.body;

  if (!messages || !Array.isArray(messages)) {
    return response.status(400).json({ error: "Bad Request: messages array required" });
  }

  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    console.warn("GROQ_API_KEY is not defined in serverless environment variables.");
    return response.status(500).json({ error: "Server Configuration Error: API key missing" });
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: messages,
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error response:", errorText);
      return response.status(groqResponse.status).json({ error: "Error from Groq API" });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return response.status(502).json({ error: "Invalid response from Groq API" });
    }

    // Return the response back to the portfolio frontend chatbot
    return response.status(200).json({ reply });
  } catch (error: any) {
    console.error("Serverless chatbot proxy error:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
