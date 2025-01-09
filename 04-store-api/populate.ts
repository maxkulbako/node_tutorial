require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    await Product.deleteMany();
    await Product.create(jsonProducts.products);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
