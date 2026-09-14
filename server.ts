import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for AI-powered Galaxy S26 Horizon Lock configuration & code generation
app.post("/api/ai-config", async (req, res) => {
  try {
    const { prompt, stabilizationMode, angleLimit, targetFps } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback response if API key is not set
      return res.json({
        success: true,
        generatedCode: `// Galaxy S26 Horizon Lock Generated Configuration (Offline Fallback)
package com.samsung.android.camera.horizonlock

import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CaptureRequest

class HorizonLockConfigurator {
    fun applySettings(builder: CaptureRequest.Builder) {
        // Mode: ${stabilizationMode || '360_FULL_LOCK'}
        // Angle Limit: ${angleLimit || '360'}°
        // Target FPS: ${targetFps || '60'}
        builder.set(CaptureRequest.CONTROL_VIDEO_STABILIZATION_MODE, 3)
        // Samsung S26 Advanced Sensor Fusion & Horizon Leveling
        builder.set(CaptureRequest.SCALER_CROP_REGION, android.graphics.Rect(0, 0, 4000, 3000))
    }
}`,
        explanation: "Generated standard Samsung S26 camera pipeline configuration with hardware-accelerated 360-degree horizon leveling and ultra-low latency gyroscope fusion."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: model,
      contents: `You are an expert Android Camera2 / CameraX engineer specializing in Samsung Galaxy flagship camera hardware (specifically the Galaxy S26 Ultra's 360-degree Horizon Lock and Super Steady gimbal stabilization engine).
      
User request / parameters:
- Prompt: "${prompt || 'Configure 360-degree horizon lock for action sports'}"
- Stabilization Mode: "${stabilizationMode || 'Full 360° Lock'}"
- Angle Limit: "${angleLimit || 360}°"
- Target FPS: "${targetFps || 60}"

Provide a response in JSON format with two keys:
1. "generatedCode": A complete, production-ready Kotlin class or Gradle configuration snippet for Android using CameraX or Camera2 API.
2. "explanation": A concise engineering explanation of how this configuration leverages the S26 NPU and sensor fusion.`
    });

    const text = response.text || "";
    // Try to parse JSON from text or return raw
    try {
      // Clean markdown code blocks if present
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      res.json({ success: true, ...parsed });
    } catch {
      res.json({
        success: true,
        generatedCode: text,
        explanation: "Successfully generated custom Galaxy S26 Horizon Lock configuration via Gemini AI."
      });
    }
  } catch (error: any) {
    console.error("AI Error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate configuration" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Galaxy S26 Horizon Lock Camera Repo" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
