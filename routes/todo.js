const express = require("express");
const router = express.Router();
const Todo = require("../controller/todoController");

router.get("/all", Todo.index);
router.get("/search", Todo.search);
router.get("/:id", Todo.show);
router.post("/add", Todo.add);
router.put("/:id", Todo.update);
router.delete("/:id", Todo.remove);

module.exports = router;
