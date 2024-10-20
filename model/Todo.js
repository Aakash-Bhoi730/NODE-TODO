const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

TodoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Todo", TodoSchema);
