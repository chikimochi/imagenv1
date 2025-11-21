import { GoogleGenAI } from "@google/genai";
import { AspectRatio, GenerationResult } from '../types';
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the client with the API Key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImageFromPrompt = async (
  prompt: string,
  aspectRatio: AspectRatio
): Promise<GenerationResult> => {
  try {
    // Using gemini-2.5-flash-image as per guidelines for general image generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // Note: imageSize is not supported on Flash-tier image models, only Pro-Image.
          // We adhere to the capabilities of the requested flash model.
        },
      },
    });

    let imageUrl: string | null = null;
    let textMetadata = '';

    // Iterate through parts to find image data
    if (response.candidates && response.candidates.length > 0) {
      const content = response.candidates[0].content;
      if (content && content.parts) {
        for (const part of content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
          } else if (part.text) {
            textMetadata += part.text;
          }
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in the response.");
    }

    return { imageUrl, textMetadata };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image");
  }
};
