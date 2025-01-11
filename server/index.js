import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsRouter from './routes/products.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import verifyToken from './middleware/verification.js'
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productsRouter);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/verify-token",verifyToken);


app.get("/", (req, res) => {
    res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
