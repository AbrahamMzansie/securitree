const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authAdminRoutes = require("./routes/adminRoutes/authRoutes");
const hierarchyRoutes = require("./routes/hierarchyRoutes");

//environment variable or constants
env.config();

//mongo data connection

mongoose
  .connect(process.env.MONGODB_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  });
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use("/api", hierarchyRoutes);
app.use("/api", authAdminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
