import { GoogleGenAI } from "@google/genai";
import { AspectRatio, GenerationResult } from '../types';

export const generateImageFromPrompt = async (
  apiKey: string,
  prompt: string,
  aspectRatio: AspectRatio
): Promise<GenerationResult> => {

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash", // lebih aman di semua region
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseModalities: ["image"],
        image: { aspectRatio }
      }
    });

    const parts = response?.candidates?.[0]?.content?.parts ?? [];
    
    let imageUrl: string | null = null;
    let textMetadata = "";

    for (const part of parts) {
      if (part.inlineData?.data) {
        const base64 = part.inlineData.data;
        const mime = part.inlineData.mimeType || "image/png";
        imageUrl = `data:${mime};base64,${base64}`;
      } else if (part.text) {
        textMetadata += part.text;
      }
    }

    if (!imageUrl) {
      throw new Error("Image generation failed: No image returned.");
    }

    return { imageUrl, textMetadata };

  } catch (err: any) {
    console.error("Gemini API Error:", err);

    const msg =
      err?.response?.error?.message ||
      err?.message ||
      "Failed to generate image";

    throw new Error(msg);
  }
};
