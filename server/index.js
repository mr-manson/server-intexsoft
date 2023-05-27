const express = require("express");
const routs = require("../routs/routes");
const {sequelize, connect} = require('../db/db.js');

const app = express();
const port = process.env.PORT || 5000;

/*app.use(function (req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
})*/
app.use(express.json());
app.use("/api", routs);

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(port, async () => {
    console.log(`Server starts on port ${port}`);
    await connect();
});