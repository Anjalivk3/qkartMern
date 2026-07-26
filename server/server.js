require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// actual routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// app.use((req, res, next) => {

//     console.log(`in middleware inside server.js ${req.method} ${req.url}`);
//     //next();
//     // res.json({
//     // success: true,
//     // message: "never reach on route, returns from here only"});
//     next();
// });

// implemented test route
// app.get("/", (req,res)=>{
//   res.json({
//     success: true,
//     message: "Welcome QkartMern Backend Server is Runnig Now"})
// });


// Starting the server

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start server");
    }
};

startServer();

