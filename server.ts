import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "RubelBank ZKP FinTech Node Core",
      timestamp: new Date().toISOString(),
      districtNodes: 64,
      zkpEngine: "Groth16 & Bulletproofs"
    });
  });

  // Server-Side Gemini API Proxy Endpoint for AI Advisor & Audit
  app.post("/api/gemini/advisor", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is missing on server."
        });
      }

      const { prompt, language = 'en' } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are RubelBank's (রুবেল ব্যাংক) Chief Cryptographic Officer and AI Financial Security Advisor.
RubelBank is a Bangladeshi ZKP FinTech platform operating a 64-district node corridor across Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and Mymensingh.
You excel at explaining Zero-Knowledge Proofs (Groth16, ZK-SNARKs, Bulletproofs), shielded BDT transfers, AES-256 Room audit logs, TOTP 2FA, and district node latency.
Respond directly, helpfully, and concisely in ${language === 'bn' ? 'Bangla (বাংলা)' : 'English'}.
Keep responses under 180 words, formatted in clean Markdown with key highlights.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({
        reply: response.text || "No response generated."
      });
    } catch (err: any) {
      console.error("Gemini API Error in RubelBank backend:", err);
      return res.status(500).json({
        error: "Failed to query Gemini AI Advisor.",
        details: err?.message || String(err)
      });
    }
  });

  // Vite development middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🏦 RubelBank ZKP Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start RubelBank server:", err);
});
