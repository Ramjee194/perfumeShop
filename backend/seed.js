import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  { name: "Luxury Oud", description: "Premium oud fragrance with long-lasting aroma.", price: 1120, query: "perfume oud", reviews: ["Amazing scent!", "Lasts all day."] },
  { name: "Skinn by Titan", description: "Fragrance with hints of rose and jasmine.", price: 1195, query: "perfume rose", reviews: ["Perfect for summer."] },
  { name: "Fogg", description: "Citrus notes for a refreshing experience.", price: 1180, query: "perfume citrus", reviews: ["Refreshing and light."] },
  { name: "Vanilla Dreams", description: "Sweet vanilla fragrance with a warm undertone.", price: 1110, query: "perfume vanilla", reviews: ["Soothing fragrance."] },
  { name: "Ocean Breeze", description: "Cool aquatic fragrance inspired by the sea.", price: 85, query: "perfume ocean", reviews: ["Feels like the beach!"] },
  { name: "Magnet-Star", description: "Spicy fragrance.", price: 10130, query: "perfume amber", reviews: ["Elegant and classy."] },
  { name: "Woody Musk", description: "Woody musk fragrance with earthy tones.", price: 2205, query: "perfume wood", reviews: ["Perfect for winter."] },
  { name: "Wild Stone", description: "Lavender-based fragrance to calm your senses.", price: 375, query: "perfume lavender", reviews: ["Very relaxing."] },
  { name: "Coffee Noir", description: "Strong coffee fragrance with dark tones.", price: 1240, query: "perfume coffee", reviews: ["Bold and unique."] },
  { name: "Spicy Charm", description: "Spicy oriental fragrance with exotic notes.", price: 1125, query: "perfume spice", reviews: ["Hot and exotic."] },
];

const fetchImages = async (query) => {
  const images = [];
  for (let i = 0; i < 5; i++) {
    try {
      const res = await axios.get(`https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
      images.push(res.data.urls.regular);
    } catch (err) {
      console.error("Error fetching image:", err.message);
    }
  }
  return images;
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "perfumeShop" });
    await Product.deleteMany({});

    for (const p of products) {
      const images = await fetchImages(p.query);
      const reviews = p.reviews.map((comment) => ({ comment }));
      const product = new Product({ name: p.name, description: p.description, price: p.price, images, reviews });
      await product.save();
    }

    console.log("Database Seeded with Unsplash Images Successfully 🌸");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding Error:", err);
    mongoose.connection.close();
  }
};

seedDB();
