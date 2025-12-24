
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProductImage = async (base64Image: string): Promise<AIAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image.split(',')[1] || base64Image,
              },
            },
            {
              text: "Analyze this electronic item and provide a professional marketplace listing. Suggest a title, a detailed description for a college student buyer, a realistic suggested price in Indian Rupees (INR), and a category.",
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            suggestedPrice: { 
              type: Type.NUMBER,
              description: "The suggested price for the item in Indian Rupees (INR)."
            },
            category: { type: Type.STRING },
          },
          required: ["title", "description", "suggestedPrice", "category"],
        },
      },
    });

    return JSON.parse(response.text) as AIAnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
