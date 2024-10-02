const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config("");

const url = process.env.DB;
async function connectDB() {
  try {
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
}

module.exports = connectDB;
