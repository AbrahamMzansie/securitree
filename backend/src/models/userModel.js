const mongoose = require("mongoose");
const bcrpt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_Name: {
      type: String,
      required: true,
      trim: true,
    },
    surName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    hash_password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrpt.compare(password, this.hash_password);
  },
};

const user = mongoose.model("User", userSchema);
module.exports = user;
