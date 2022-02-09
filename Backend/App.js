const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// database connection
const connectDB = require("./config/db");
connectDB()
// middlewares
app.use(cors());
app.use("/public", express.static("public"))
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
// routes
const apiRoutes = require("./Routes/apiRoutes")
const loginRoutes = require("./Routes/loginRoutes")
const adminRoutes = require("./Routes/adminRoutes")
// using routes
app.use("/blog", apiRoutes)
app.use("/login", loginRoutes)
app.use("/admin", adminRoutes)
app.get("*", (req, res) => {
    res.send("Invalid URL: Page not found")
})
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Working on ${PORT}`);
})