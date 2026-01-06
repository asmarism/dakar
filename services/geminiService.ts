
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI SDK with the API key from environment variables
// The SDK requires the apiKey to be passed in a named parameter object
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Official Dakar Rally Saudi Arabia Assistant. 
Your tone is energetic, knowledgeable, and professional. 
You provide information about:
1. Current 2024/2025 Dakar standings (using search grounding).
2. Historical winners and records.
3. Information about competitors by their bib numbers.
4. Regulations, route details, and Saudi Arabian landmarks on the route.
Always respond in Arabic as the primary language, but you can include English terms where necessary (e.g. car models, team names).
When providing search-grounded info, cite your sources.
`;

// Fix: Removed the invalid import of ChatMessage as it does not exist in types.ts
export const getDakarInfo = async (query: string): Promise<{ text: string; links: any[] }> => {
  try {
    // Fix: Using ai.models.generateContent to fetch data with googleSearch grounding
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    // Fix: Using the .text property to access the response string as per @google/genai guidelines
    const text = response.text || "عذراً، لم أتمكن من الحصول على المعلومات المطلوبة حالياً.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Fix: Extracting URLs from groundingChunks to display sources as required by guidelines
    const links = chunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return { text, links };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      text: "حدث خطأ في الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى لاحقاً.", 
      links: [] 
    };
  }
};

export const createDakarChat = () => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });
};
