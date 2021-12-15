const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    specie: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
);

module.exports = mongoose.model("maximums", TaskSchema);