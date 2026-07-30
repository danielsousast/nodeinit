const mongoose = require("mongoose");

const connectDatabase = async (dbUrl) => {
  if (!dbUrl) {
    throw new Error("MONGO_DB_URL is not defined");
  }

  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");
};

module.exports = { connectDatabase };
