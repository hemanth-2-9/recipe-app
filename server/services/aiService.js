import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateRecipe(ingredients) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

    // Change: Updated prompt to use '###' for all headings for easier parsing.
    const prompt = `
      Generate a recipe based on the following ingredients: ${ingredients}.
      Please format the output in Markdown. Each section MUST start with '### ' followed by the title.
      Use the following sections:
      - ### Recipe Title 
      - ### Description
      - ### Ingredients
      - ### Instructions
      - ### Tips
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("AI Error:", err);
    throw err;
  }
}
