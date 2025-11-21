import { GoogleGenAI } from "@google/genai";
import { AspectRatio, GenerationResult } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// INISIALISASI CLIENT
const ai = new GoogleGenAI({ apiKey });

export const generateImageFromPrompt = async (
  prompt: string,
  aspectRatio: AspectRatio
): Promise<GenerationResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-image",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseModalities: ["image"],
        image: {
          aspectRatio
        }
      }
    });

    let imageUrl: string | null = null;
    let textMetadata = '';

    const parts = response?.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        const base64 = part.inlineData.data;
        const mime = part.inlineData.mimeType || "image/png";
        imageUrl = `data:${mime};base64,${base64}`;
      } else if (part.text) {
        textMetadata += part.text;
      }
    }

    if (!imageUrl) throw new Error("Image data not found");

    return { imageUrl, textMetadata };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image");
  }
};
