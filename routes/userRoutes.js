const router = require("express").Router();
const User = require("../models/user")
const Post = require("../models/post")
const bcrypt = require("bcrypt")


// Get user

router.get("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){

        try{
            const user = await User.findById(req.params.id);
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        }catch(err){
            res.status(404).json({message:"User Not Found"})
        }

    }else{
        res.status(401).json("Invalid Request")
    }

})


// UPDATE
router.put("/:id", async (req,res)=>{

    if(req.body.userId === req.params.id){

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
            const {password, ...others} = updatedUser._doc;
            res.status(200).json(others);
        } catch (err){ 
            res.status(500).json(err);
        }

    }else{
        res.status(401).json("Invalid Request")
    }

})

// DELETE
router.delete("/:id", async (req,res)=>{

    if(req.body.userId === req.params.id){

        try{

            const user = await User.findById(req.params.id)

            try{
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id)  
                res.status(200).json({message:"User deleted successfully", success:true});
            } catch (err){ 
                res.status(500).json(err);
            }

        }catch(err){
            res.status(404).json({message:"User Not Found", success:false})
        }

    }else{
        res.status(401).json("Invalid Request")
    }

})



module.exports = router;