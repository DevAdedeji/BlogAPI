const router = require("express").Router();
const User = require("../models/user")


// Register
router.post("/register", async (req,res)=>{

    try{
        const newUser = new User({
            username:req.body.username,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });
        const user = await newUser.save()
        res.status(200).json({user, sucess:true})
    } catch (err){
        res.status(500).json(err);
    }

})

// Login
router.post("/login", async (req,res)=>{

})


module.exports = router;