import express from "express";
import { getAddresses , getProfile , addAddress, deleteAddress} from "../controllers/userController.js";
import {getCart,addToCart,removeFromCart} from "../controllers/cartController.js"
const router = express.Router();

router.get("/profile", getProfile);
router.get("/cart", getCart);
router.get("/addresses", getAddresses);
router.post("/address", addAddress);
router.delete("/address/:id", deleteAddress);
router.post("/add-to-cart",addToCart);
router.post("/remove-from-cart",removeFromCart);
export default router;