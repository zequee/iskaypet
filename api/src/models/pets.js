
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    dateBirth: { type: Date, required: true },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("pets", TaskSchema);