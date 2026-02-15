export const buildInsightsPrompt = (metadata) => {
  return `
You are a senior data analyst.

Analyze this dataset summary and provide concise insights.

Dataset Summary:
${JSON.stringify(metadata, null, 2)}

Provide:
- 3–5 key trends
- Possible outliers
- Data quality issues
- Recommendations

Respond in bullet points only.
Keep it concise.
`;
};
