const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const booksRouter = require("./routes/books");

require("dotenv").config();
const dbUrl = process.env.MONGO_DB_URL;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/books", booksRouter);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

mongoose.connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
