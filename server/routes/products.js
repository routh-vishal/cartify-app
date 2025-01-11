import express from 'express';
import pool from '../config/db.js';
import {getItemDetails, getTopDeals} from '../controllers/itemController.js'
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search', async (req, res) => {
    const { q } = req.query; // Extract the search term from the query string
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE LOWER(name) LIKE $1 OR LOWER(description) LIKE $1',
            [`%${q.toLowerCase()}%`]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/item/:id', getItemDetails);

router.get('/top-deals',getTopDeals);


export default router;
