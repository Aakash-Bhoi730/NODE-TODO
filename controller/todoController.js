const Todo = require("../model/Todo");

const add = (req, res) => {
  let newTodo = new Todo({
    task: req.body.task,
    completed: req.body.completed,
    createdAt: req.body.createdAt,
  });
  newTodo
    .save()
    .then((result) => {
      res.status(201).json({
        message: "created Successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error ",
      });
    });
};

const index = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const options = {
    page,
    limit,
    sort: { createdAt: -1 },
  };
  Todo.paginate({}, options)
    //   Todo.find()
    .then((result) => {
      res.status(200).json({
        data: result.docs,
        totalItems: result.totalDocs, // Total number of documents
        totalPages: result.totalPages, // Total number of pages
        currentPage: result.page,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error ",
      });
    });
};
const show = (req, res) => {
  Todo.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error ",
      });
    });
};

const search = (req, res) => {
  const searchQuery = req.query.search || ""; // Extract search term

  // Build query for searching 'task' field
  const query = searchQuery
    ? { task: { $regex: searchQuery, $options: "i" } } // Case-insensitive search
    : {};

  Todo.find(query)
    .then((result) => {
      res.status(200).json({
        data: result,
        totalItems: result.length,
      });
    })
    .catch((err) => {
      console.error("Error in search query:", err); // Log error for debugging
      res.status(500).json({
        message: "Server error",
      });
    });
};

const update = (req, res) => {
  let id = req.params.id;
  let updateData = {
    task: req.body.task,
    completed: req.body.completed,
    createdAt: req.body.createdAt,
  };
  Todo.findByIdAndUpdate(id, { $set: updateData })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Data Updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error ",
      });
    });
};
const remove = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: "Data deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error ",
      });
    });
};
module.exports = {
  add,
  update,
  remove,
  show,
  index,
  search,
};
