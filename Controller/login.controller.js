import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkUserExists } from "../mongodb/controller/auth.model.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Vérifier si l'utilisateur existe
    const user = await checkUserExists(email);
    if (!user) {
      return res.status(403).json({ message: "Email is not registered. Please Sign Up." });
    }

    // Comparer le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Clé secrète JWT
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      console.error("JWT_SECRET_KEY is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Générer le token JWT (exp. 5 jours)
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "5d" }
    );

    // Détection de l'environnement
    const isProduction = process.env.NODE_ENV === "production";

    // Configurer les options du cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,                 // true en prod, false en dev
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 5 * 24 * 60 * 60 * 1000,      // 5 jours
    });

    console.log(token);

    return res.status(201).json({ message: "Login Successful" });
  } catch (err) {
    next(err);
  }
}
