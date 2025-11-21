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
      model: "gemini-2.0-flash-image",
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

    const parts = response?.candidates?.[0]?.content?.parts || [];
    let imageUrl = null;
    let textMetadata = "";

    for (const part of parts) {
      if (part.inlineData) {
        const base64 = part.inlineData.data;
        const mime = part.inlineData.mimeType || "image/png";
        imageUrl = `data:${mime};base64,${base64}`;
      } else if (part.text) {
        textMetadata += part.text;
      }
    }

    if (!imageUrl) throw new Error("Image generation failed");

    return { imageUrl, textMetadata };

  } catch (err: any) {
    console.error("Gemini API Error:", err);
    throw new Error(err.message || "Failed to generate image");
  }
};
