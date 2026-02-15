import { generateInsightsWithFailover } from "./gemini/gemini.manager.js";

export const generateFollowUpResponse = async (
  metadata,
  previousInsights,
  userQuestion
) => {
  const prompt = `
You are a professional data analyst.

You must ONLY answer using the dataset summary and previous insights provided.
If the question is unrelated, respond:
"Question not related to dataset."

Dataset Summary:
${JSON.stringify(metadata, null, 2)}

Previous Insights:
${previousInsights}

User Question:
${userQuestion}

Provide a clear and concise answer.
`;

  return await generateInsightsWithFailover({
    customPrompt: prompt,
  });
};
