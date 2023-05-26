const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/todos", async (req, res) => {
    const todos = await Task.findAll();
    res.status(200).json(todos);
});

router.get("/todo/:id", async (req, res) => {
    const task = await Task.findOne({
        where:{
            id: req.params.id,
        }
    })
    res.status(200).json(task);
});

router.post("/todos", async (req, res) => {
    const {content, description} = req.body;
    const newTask = Task.build({
        "content": content,
        "description": description,
    });

    try{
        await newTask.save();
        res.status(200).json(newTask);
    } catch (error) {
        res.json(error);
    }

});

router.put("/todo/:id", (req, res) => {

});

router.delete("/todo/:id", (req, res) => {

});

module.exports = router;