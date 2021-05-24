const mongoose = require("mongoose");
const doorSchema = mongoose.Schema({
  id: { type: String, reqired: true },
  name: { type: String, reqired: true },
  parent_area: { type: String },
  status: { type: String },
});
const Door = mongoose.model("Door", doorSchema);
module.exports = Door;
