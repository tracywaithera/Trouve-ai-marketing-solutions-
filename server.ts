import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Proxy to keep key server-side
  app.post("/api/chat", async (req, res) => {
    const { messages, systemInstruction } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Chat Error: GEMINI_API_KEY missing");
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    try {
      const { GoogleGenAI } = await import("@google/genai") as any;
      const genAI = new GoogleGenAI(apiKey);
      
      const lastMessage = messages[messages.length - 1].text;

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      }, {
        apiVersion: "v1beta"
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: lastMessage }] }],
        systemInstruction: systemInstruction
      });
      const response = await result.response;
      const text = response.text();
      
      res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error Detail:", error);
      res.status(500).json({ 
        error: "Failed to fetch response from AI.",
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
