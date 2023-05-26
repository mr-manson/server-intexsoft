const express = require("express");
const routs = require("../routs/routes");
const {sequelize, connect} = require('../db/db.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", routs);

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(port, async () => {
    console.log(`Server starts on port ${port}`);
    await connect();
});