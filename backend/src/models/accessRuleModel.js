const mongoose = require("mongoose");

const doorSchema = mongoose.Schema({
  id: { type: String },
});

const accessRulesSchema = mongoose.Schema({
  id: { type: String, reqired: true },
  name: { type: String, reqired: true },
  doors: [doorSchema],
});

const AccessRule = mongoose.model("AccessRule", accessRulesSchema);
module.exports = AccessRule;
