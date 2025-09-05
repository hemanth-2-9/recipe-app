import { generateRecipe } from "../services/aiService.js";

export async function getRecipe(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const aiResponse = await generateRecipe(prompt);
    res.json({ recipe: aiResponse });
  } catch (err) {
    res.status(500).json({ error: err.message || "AI request failed" });
  }
}
