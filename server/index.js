import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsRouter from './routes/products.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import verifyToken from './middleware/verification.js'
const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow curl/Postman
    if (origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: '*', // add custom headers here
  credentials: true
}));

// Handle preflight requests
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
