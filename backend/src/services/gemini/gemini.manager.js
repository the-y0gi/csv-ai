import { ENV } from "../../config/env.config.js";
import { callGeminiWithKey } from "./gemini.client.js";
import { buildInsightsPrompt } from "./gemini.prompt.js";
import {
  generateCacheKey,
  getFromCache,
  setToCache,
} from "../cache.service.js";


export const generateInsightsWithFailover = async (metadata) => {
  let prompt;

  if (metadata.customPrompt) {
    prompt = metadata.customPrompt;
  } else {
    prompt = buildInsightsPrompt(metadata);
  }

  const cacheKey = generateCacheKey(prompt);

  const cached = getFromCache(cacheKey);
  if (cached) {
    console.log("Serving from AI cache");
    return cached;
  }

  const keys = ENV.GEMINI_KEYS;
  let lastError = null;

  for (let i = 0; i < keys.length; i++) {
    try {
      const response = await callGeminiWithKey(keys[i], prompt);

      setToCache(cacheKey, response);

      return response;
    } catch (error) {
      lastError = error;

      if (
        error.message?.includes("429") ||
        error.message?.toLowerCase().includes("quota")
      ) {
        continue;
      }

      break;
    }
  }

  return "AI insights temporarily unavailable. Please try again later.";
};

