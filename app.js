const express = require("express");
const booksRouter = require("./routes/books");
const { setupI18n } = require("./config/i18n");
const { connectDatabase } = require("./config/database");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandlers");

require("dotenv").config();
const dbUrl = process.env.MONGO_DB_URL;

const app = express();

setupI18n(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/books", booksRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDatabase(dbUrl);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.error("Error starting server:", err.message);
    process.exit(1);
  }
};

startServer();
