import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsRouter from './routes/products.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import verifyToken from './middleware/verification.js'
const app = express();

app.use(cors({
  origin: "https://cartify-app-rouge.vercel.app", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight OPTIONS requests
app.options("*", cors());
app.use(bodyParser.json());

app.use("/api/products", productsRouter);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/verify-token",verifyToken);


app.get("/", (req, res) => {
    res.send("API is running...");
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
