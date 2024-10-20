const express = require("express");
const router = express.Router();
const Todo = require("../controller/todoController");
const auth = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", Todo.index);
router.get("/search", Todo.search);
router.get("/:id", Todo.show);
router.post("/add", authMiddleware, Todo.add);
router.put("/:id", Todo.update);
router.delete("/:id", Todo.remove);

module.exports = router;
