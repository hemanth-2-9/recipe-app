import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

const recipesData = {
  vegetarian: [
    {
      title: "Grilled Veggie Skewers",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
      details:
        "Marinated zucchini, bell peppers, mushrooms, and onions grilled to perfection.",
    },
    {
      title: "Paneer Tikka",
      img: "https://images.unsplash.com/photo-1625941361682-6aab6f3793da?w=600",
      details: "Indian spiced paneer cubes grilled with veggies.",
    },
  ],
  "quick-meals": [
    {
      title: "10-Minute Fried Rice",
      img: "https://images.unsplash.com/photo-1604908177225-6c3d6bb0b0d9?w=600",
      details: "Quick fried rice with veggies, soy sauce, and scrambled egg.",
    },
    {
      title: "Avocado Toast",
      img: "https://images.unsplash.com/photo-1559628233-1a92d1e9f1d6?w=600",
      details: "Crispy toast with mashed avocado, chili flakes, and olive oil.",
    },
  ],
  desserts: [
    {
      title: "Chocolate Brownie",
      img: "https://images.unsplash.com/photo-1599785209707-28c2c69a3f07?w=600",
      details: "Rich gooey brownies with dark chocolate.",
    },
    {
      title: "Cheesecake",
      img: "https://images.unsplash.com/photo-1600891964095-6f9b6e0aeb32?w=600",
      details: "Classic creamy cheesecake with biscuit base.",
    },
  ],
  vegan: [
    {
      title: "Vegan Buddha Bowl",
      img: "https://images.unsplash.com/photo-1606755962773-bb8e3e91b3c5?w=600",
      details:
        "A mix of quinoa, roasted chickpeas, fresh veggies, and tahini sauce.",
    },
    {
      title: "Vegan Pancakes",
      img: "https://images.unsplash.com/photo-1559628233-1a92d1e9f1d6?w=600",
      details: "Fluffy pancakes made with almond milk and maple syrup.",
    },
  ],
  "high-protein": [
    {
      title: "Grilled Chicken Salad",
      img: "https://images.unsplash.com/photo-1603133872878-684f06d865d0?w=600",
      details:
        "High-protein salad with grilled chicken, greens, and Greek yogurt dressing.",
    },
    {
      title: "Protein Smoothie",
      img: "https://images.unsplash.com/photo-1625938145977-327c52f4fb61?w=600",
      details:
        "Banana, protein powder, almond milk, and peanut butter shake.",
    },
  ],
};

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const recipes = recipesData[category] || [];
  
  // Improved title formatting
  const formattedTitle = category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [category]);

  // to prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { // Cleanup function
      document.body.style.overflow = 'auto';
    };
  }, [selectedRecipe]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <PacmanLoader color="#FFA829" size={42} />
          <p className="text-white text-lg font-semibold animate-pulse">
            Loading {formattedTitle} recipes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Background image and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/326279/pexels-photo-326279.jpeg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 px-6 py-10">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition"
        >
          ← Back
        </button>

        <h2 className="text-4xl font-bold mb-8 text-center">
          {formattedTitle} Recipes
        </h2>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.title}
              onClick={() => setSelectedRecipe(recipe)}
              className="cursor-pointer bg-white/10 rounded-xl shadow-lg overflow-hidden backdrop-blur-md hover:scale-105 transition"
            >
              <img
                src={recipe.img}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {recipe.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Recipe Details */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl max-w-lg w-full text-white relative shadow-xl">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedRecipe.img}
              alt={selectedRecipe.title}
              className="h-56 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h3>
            <p className="text-gray-200">{selectedRecipe.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;