const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authAdminRoutes = require("./routes/adminRoutes/authRoutes");
const authRoutes = require("./routes/authRoutes");
const hierarchyRoutes = require("./routes/hierarchyRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const initialDataRoutes = require("./routes/adminRoutes/initialDataRoutes");
const pageRoutes = require("./routes/adminRoutes/pageRoutes");

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
app.use("/api", authRoutes);
app.use("/api" , hierarchyRoutes);
app.use("/api", authAdminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
