-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create User Profiles Table
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create Addresses Table
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into the products table
INSERT INTO products (name, description, price, image_url, category)
VALUES
  ('Phone', 'Latest smartphone with advanced features.', 69999, 'https://via.placeholder.com/250', 'Electronics'),
  ('Shoes', 'Comfortable running shoes for daily use.', 2499, 'https://via.placeholder.com/250', 'Footwear'),
  ('Camera', 'High-quality DSLR camera for professional shots.', 24999, 'https://via.placeholder.com/250', 'Electronics'),
  ('Headphones', 'Noise-cancelling headphones for immersive sound.', 1999, 'https://via.placeholder.com/250', 'Electronics'),
  ('Laptop', 'High-performance laptop with powerful features.', 49999, 'https://via.placeholder.com/250', 'Electronics'),
  ('Keyboard', 'Mechanical keyboard with smooth typing experience.', 1299, 'https://via.placeholder.com/250', 'Electronics'),
  ('Watch', 'Stylish wristwatch with sleek design.', 2999, 'https://via.placeholder.com/250', 'Accessories'),
  ('Bag', 'Durable backpack for everyday use.', 1499, 'https://via.placeholder.com/250', 'Accessories'),
  ('Headset', 'Noise-cancelling headset for immersive sound.', 1999, 'https://via.placeholder.com/250', 'Electronics');

-- Create My Cart Table
CREATE TABLE my_cart (
    user_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);
