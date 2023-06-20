require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("../routes/routes");
const {connect} = require('../db/db.js');
const errorMiddleware = require("../middlewares/error-middleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use("/api", routes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(PORT, async () => {
    console.log(`Server starts on port ${PORT}`);
    await connect();
});