// check_models.js
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables from .env file
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
  if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY not found in .env file.");
    return;
  }

  console.log("Fetching available models for your API key...");

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      // If response is not OK, log the error details from the body
      const errorBody = await response.json();
      console.error("Error fetching models. Status:", response.status);
      console.error("Error details:", errorBody);
      return;
    }

    const data = await response.json();

    console.log("\n✅ Success! Here are the models available to you:\n");
    
    // Filter to show only models that support 'generateContent'
    const supportedModels = data.models.filter(model => 
        model.supportedGenerationMethods.includes("generateContent")
    );

    if (supportedModels.length > 0) {
        supportedModels.forEach(model => {
            console.log("---------------------------------");
            console.log("Model Name:", model.name);
            console.log("Display Name:", model.displayName);
            console.log("Description:", model.description);
        });
        console.log("---------------------------------");
        console.log("\n➡️ Please use one of the 'Model Name' values from the list above in your aiService.js file.");
    } else {
        console.log("Could not find any models that support the 'generateContent' method.");
    }

  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

listModels();