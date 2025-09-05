import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes.jsx";
//import RecipeResultPage from "./pages/RecipeResultPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage/>} />
          {/* <Route path="/recipe" element={<RecipeResultPage/>} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          } />
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
