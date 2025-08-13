import axios from "axios";

export async function summarizeCommit(commitMessage: string): Promise<string> {
  try {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.error("GEMINI_API_KEY is not set.");
      return "No summary available.";
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

    const prompt = `Summarize the following Git commit message in a concise and easy-to-understand way, focusing on the key changes or features introduced:
    
    Commit Message:
    "${commitMessage}"`;

    const response = await axios.post(
      apiUrl,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    return summary || "No summary available.";
  } catch (error) {
    console.error("Gemini API error:", error);
    // You could return a more descriptive error here
    return "No summary available.";
  }
}