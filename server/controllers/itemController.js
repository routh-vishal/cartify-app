import pool from "../config/db.js";

export const getItemDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);


        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching item details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTopDeals = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT id, name, price, image_url, description FROM products ORDER BY price DESC LIMIT 5'
        );
        res.json(rows);
    } catch (error) {
        console.error("Error fetching top deals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}