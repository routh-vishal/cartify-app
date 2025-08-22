import pool from '../config/db.js'
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userQuery = `
      SELECT u.email, u.username, p.first_name, p.last_name, p.phone_number, p.address 
      FROM users u
      LEFT JOIN user_profiles p ON u.id = p.user_id
      WHERE u.id = $1
    `;
    const { rows } = await pool.query(userQuery, [userId]);

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get addresses
export const getAddresses = async (req, res) => {
  try {
    const userId=req.user.id;
    const { rows } = await pool.query("SELECT id, address FROM addresses WHERE user_id = $1", [userId]); // Example user ID
    res.json(rows);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new address
export const addAddress = async (req, res) => {
  const userId=req.user.id;
  try {
    const { address } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO addresses (user_id, address) VALUES ($1, $2) RETURNING *",
      [userId, address] 
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await pool.query("DELETE FROM addresses WHERE id = $1 AND user_id = $2", [id, userId]); // Example user ID
    if (result.rowCount === 0) return res.status(404).json({ message: "Address not found" });

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};