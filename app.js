const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const multer = require("multer");


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


const storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, "images")
    },
    filename:(req, file, cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage:storage})

app.post("api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("FIle has been uploaded");
})

app.use("/api/auth/",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes);
app.use("/api/categories",categoryRoutes);