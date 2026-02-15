import { GoogleGenerativeAI } from "@google/generative-ai";

export const callGeminiWithKey = async (apiKey, prompt) => {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);
  try {
    const result = await model.generateContent(prompt, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    return result.response.text();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
};
