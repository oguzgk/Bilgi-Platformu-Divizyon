import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: In a real environment, verify API_KEY exists.
// Here we are creating the structure. If no key is provided, the function will handle it gracefully or fail.
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const summarizeWikiContent = async (content: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning mock summary.");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Gemini API key eksik. Bu, wiki içeriğinin otomatik oluşturulmuş bir özetidir. (Mock Data)");
        }, 1000);
    });
  }

  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: `Lütfen aşağıdaki üniversite ders notu wiki içeriğini, öğrenciler için 3-4 cümlelik kısa, öz ve motive edici bir özet haline getir. Türkçe yanıtla.\n\nİçerik:\n${content}`,
    });
    
    return response.text || "Özet oluşturulamadı.";
  } catch (error) {
    console.error("Gemini summarization failed:", error);
    return "Özet oluşturulurken bir hata meydana geldi.";
  }
};
