const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controllers");
const styleController= require("../controllers/style-controllers")
const {body} =require("express-validator");

router.post("/signup",
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    userController.signup);
router.post("/signin", userController.signin);
router.post("/signout", userController.signout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

router.get("/styles", styleController.getStyles);

/*router.get("/todos", async (req, res) => {
    const todos = await Task.findAll();
    res.status(200).json(todos);
});

router.get("/todo/:id", async (req, res) => {
    const task = await Task.findOne({
        where: {
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
    try {
        await newTask.save();
        res.status(200).json(newTask);
    } catch (error) {
        res.json(error);
    }

});

router.put("/todo/:id", (req, res) => {

});

router.delete("/todo/:id", async (req, res) => {
    const task = await Task.findOne({
        where: {
            id: req.params.id,
        }
    });
    await task.destroy();
    res.status(204).json({});
});*/

module.exports = router;