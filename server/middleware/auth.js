import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode; // Storing the user data on the request object
    next();
  } catch (e) {
    console.error("Authentication error:", e);
    // Correct status code for unauthorized access due to a bad token
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
