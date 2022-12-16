const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")



const app = express();
const db_URL = process.env.DB_URL;

app.use(express.json())

mongoose.set("strictQuery", true)
mongoose.connect(db_URL)
.then((result)=>{
    console.log("Connected to DB")
    app.listen('3000', ()=>{
        console.log("Server running")
    })
})
.catch((e)=>{
    console.log(e)
})

app.get("/", (req,res)=>{
    res.send("Hello")
})

app.use("/api/auth/",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes);