require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { reqLogger, errLogger } = require("./middleware/loggers");
const rootRouter = require("./routes/root");
const corsOption = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")

const PORT = process.env.PORT || 3500;

connectDB();
app.use(reqLogger);
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'pug')
app.use(rootRouter)

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errLogger);

mongoose.connection.once('open', () => {
  console.log('connected to mongoDB')
  app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));
})
