import pool from '../config/db.js'
export const getCart = async (req, res) => {
    try {
        const userId = req.headers.userid;
        const query = `
        SELECT c.product_id, p.name, p.price, p.description, c.quantity, c.added_at
        FROM my_cart c
        INNER JOIN products p ON c.product_id = p.id
        WHERE c.user_id = $1;
      `;
        const { rows } = await pool.query(
            query,
            [userId]
        );

        res.json(rows);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const query = `
        INSERT INTO my_cart (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET quantity = my_cart.quantity + EXCLUDED.quantity
        RETURNING *;
      `;
        const { rows } = await pool.query(query, [userId, productId, quantity]);

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const query = `
        DELETE FROM my_cart WHERE user_id = $1 AND product_id = $2;
      `;
      const result = await pool.query(query, [userId, productId]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      res.json({ message: "Product removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };