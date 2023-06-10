const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routs = require("../routes/routes");
const {connect} = require('../db/db.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", routs);

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(PORT, async () => {
    console.log(`Server starts on port ${PORT}`);
    await connect();
});