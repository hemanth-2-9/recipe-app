import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

// Imports for Swiper Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper's CSS files for styling
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import apiClient from "../api";

const trendingRecipesData = [
  {
    title: "Pasta Primavera",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600",
    description:
      "A fresh and vibrant pasta dish loaded with spring vegetables, perfect for a light and healthy meal.",
    ingredients: [
      "250g pasta (like fusilli or penne)",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 cup broccoli florets",
      "1 carrot, julienned",
      "1/2 cup cherry tomatoes, halved",
      "1/4 cup Parmesan cheese, grated",
      "Salt and pepper to taste",
      "Fresh basil for garnish",
    ],
    instructions: [
      "Cook pasta according to package directions. Drain and set aside.",
      "In a large skillet, heat olive oil over medium heat. Add garlic and cook until fragrant.",
      "Add broccoli and carrots. Sauté for 5-7 minutes until tender-crisp.",
      "Stir in the cherry tomatoes and cooked pasta.",
      "Season with salt and pepper, then toss with Parmesan cheese.",
      "Garnish with fresh basil before serving.",
    ],
  },
  {
    title: "Avocado Salad",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    description:
      "A refreshing and creamy salad featuring ripe avocados, cherry tomatoes, and a zesty lime dressing.",
    ingredients: [
      "2 ripe avocados, cubed",
      "1 cup cherry tomatoes, halved",
      "1/4 red onion, thinly sliced",
      "1/4 cup fresh cilantro, chopped",
      "Juice of 1 lime",
      "2 tbsp olive oil",
      "Salt and black pepper to taste",
    ],
    instructions: [
      "In a medium bowl, gently combine the cubed avocados, cherry tomatoes, red onion, and cilantro.",
      "In a small bowl, whisk together the lime juice, olive oil, salt, and pepper.",
      "Pour the dressing over the avocado mixture and toss gently to combine.",
      "Serve immediately to prevent the avocado from browning.",
    ],
  },
  {
    title: "Chocolate Cake",
    img: "https://imgs.search.brave.com/ny9vE0YeDVKGlqdbAMDFIhbhQ5EsUf-A2_ii1-EX0qg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzA2LzYxLzY5/LzM2MF9GXzEwNjYx/Njk0Ml83c2lLM0RZ/OEVDblZmMERpTk1P/OFYxaGlwOEFnclhM/cC5qcGc",
    description:
      "A decadent and moist chocolate cake with a rich, fudgy texture that is sure to satisfy any chocolate lover.",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "1 cup granulated sugar",
      "1/3 cup unsweetened cocoa powder",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "1 cup water",
      "1/2 cup vegetable oil",
      "1 tsp vanilla extract",
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour an 8-inch round cake pan.",
      "In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, and salt.",
      "In a separate bowl, combine water, vegetable oil, and vanilla extract.",
      "Pour the wet ingredients into the dry ingredients and mix until just combined. Do not overmix.",
      "Pour the batter into the prepared pan and bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean.",
      "Let cool in the pan for 10 minutes before transferring to a wire rack to cool completely.",
    ],
  },
];

function HeroSection() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipePages, setRecipePages] = useState([]);

  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedRecipe]);

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/auth/logout", {});
      navigate("/login");
    } catch (e) {
      console.error("Logout failed", e);
      alert("Could not log out. Please try again.");
    }
  };

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter ingredients");
      return;
    }
    setAiLoading(true);
    setError("");
    setRecipePages([]);

    try {
      const res = await apiClient.post("api/ai/recipe", {
        prompt: ingredients,
      });

      const fullRecipe = res.data.recipe;
      if (fullRecipe) {
        const pages = fullRecipe
          .split("### ")
          .filter((page) => page.trim() !== "");
        setRecipePages(pages.map((p) => "### " + p));
      }
    } catch (err) {
      setError("Failed to fetch recipe, please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/eb/83/bf/eb83bfaa02c457b5a323eebbc3d0138e.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="flex justify-between items-center px-8 py-6">
          <div className="flex items-center gap-2 h-12">
            <img
              src="https://res.cloudinary.com/dsyfrwb0s/image/upload/v1755843420/Recipeai-removebg-preview_ddmjt6.png"
              alt="RecipeAI Logo"
              className="h-30 w-auto text-white drop-shadow-[0_4px_10px_rgba(255,193,7,0.3)] transition-transform duration-300 hover:scale-105"
            />
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border-1 text-white rounded hover:cursor-pointer hover:text-[#FFB347]"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-4">
            Cook Smart with AI
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl">
            Enter your ingredients and let AI cook up something delicious.
          </p>

          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              placeholder="Enter ingredients..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full px-8 py-6 text-xl border border-gray-300 bg-white/30 placeholder-gray-200 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFB347] transition-all duration-200"
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-200">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={handleGenerateRecipe}
            className="mt-8 px-12 py-4 text-xl font-semibold rounded-full bg-white/30 text-white backdrop-blur-md hover:bg-[#FFB347] transition transform hover:scale-105 duration-200"
          >
            {aiLoading ? "Generating..." : "Generate Recipe"}
          </button>

          {error && <p className="mt-4 text-red-400">{error}</p>}

          {recipePages.length > 0 && (
            <div className="mt-8 bg-white/10 p-6 rounded-xl w-full max-w-2xl text-white backdrop-blur-md shadow-lg">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                className="mySwiper"
              >
                {recipePages.map((page, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="prose prose-invert max-h-[400px] overflow-y-auto p-4 text-left mx-auto"
                      style={{
                        "--swiper-navigation-color": "#FFA829",
                        "--swiper-pagination-color": "#FFA829",
                      }}
                    >
                      <ReactMarkdown>{page}</ReactMarkdown>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="mt-6 flex gap-3 flex-wrap justify-center">
            {[
              "Vegetarian",
              "Quick Meals",
              "Desserts",
              "Vegan",
              "High Protein",
            ].map((cat, idx) => (
              <a
                key={idx}
                href={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                className="px-4 py-2 rounded-full border border-white/40 text-white text-sm hover:bg-white/20 cursor-pointer transition"
              >
                {cat}
              </a>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl px-4">
            {trendingRecipesData.map((recipe) => (
              <div
                key={recipe.title}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white/10 rounded-xl shadow-lg overflow-hidden backdrop-blur-md hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold text-white">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-300 text-sm">Trending Recipe</p>
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-auto py-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} RecipeAI · Cook Smart with AI
          </footer>
        </main>
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 backdrop-blur-md p-6 rounded-xl max-w-2xl w-full text-white relative shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-3 right-4 text-gray-300 hover:text-white text-3xl font-bold"
            >
              &times;
            </button>
            <img
              src={selectedRecipe.img}
              alt={selectedRecipe.title}
              className="h-64 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-3xl font-bold mb-2 text-[#FFB347]">
              {selectedRecipe.title}
            </h2>
            <p className="text-gray-300 mb-6">{selectedRecipe.description}</p>

            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-3 border-b-2 border-[#FFB347] pb-1">
                Ingredients
              </h3>
              <ul className="list-disc list-inside mb-6 space-y-1 text-gray-300">
                {selectedRecipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold mb-3 border-b-2 border-[#FFB347] pb-1">
                Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                {selectedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
