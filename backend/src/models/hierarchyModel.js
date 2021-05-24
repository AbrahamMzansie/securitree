const mongoose = require("mongoose");
const doorsSchema = mongoose.Schema({
  id: { type: String, reqired: true },
  name: { type: String, reqired: true },
  parent_area: { type: Number },
  status: { type: String },
});
const doorSchema = mongoose.Schema({
 id :{ type: String} ,
});
const accessRulesSchema = mongoose.Schema({
  id: { type: String, reqired: true },
  name: { type: String, reqired: true },
  doors: [doorSchema],
});
const childAreaSchema = mongoose.Schema({
  id : { type: String},
});
const hierarchySchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    parent_area_id: {
      type: String,
    },
    parent_area: {
      type: String,
    },
    child_area_ids: [childAreaSchema],
    doors : [doorsSchema],
    access_rules : [accessRulesSchema]
    
   
  },
  {
    timestamps: true,
  }
);
const Hierarchy = mongoose.model("Hierarchy", hierarchySchema);
module.exports = Hierarchy;
