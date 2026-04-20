import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemInstruction } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  try {
    const { GoogleGenAI } = await import("@google/genai") as any;
    const genAI = new GoogleGenAI(apiKey as string);
    
    // Get the latest message
    const lastMessage = messages[messages.length - 1].text;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    }, {
      apiVersion: "v1beta"
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: lastMessage }] }],
      systemInstruction: systemInstruction as any
    });

    const response = await result.response;
    const text = response.text();
    
    return res.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to fetch response from AI." });
  }
}
