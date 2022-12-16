const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");


// Register
router.post("/register", async (req,res)=>{

    try{

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            name:req.body.name, 
            email:req.body.email,
            password:hashedPassword,
        });
        const user = await newUser.save()
        res.status(200).json({user, sucess:true})
    } catch (err){
        if(err.keyValue){
            res.status(500).json({message:"User with details already exists", success:false})
        }else{
            res.status(500).json({message:"Server error"});
        }
    }

})

// Login
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong Credentials");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong Credentials");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;