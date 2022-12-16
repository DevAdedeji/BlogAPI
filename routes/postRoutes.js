const router = require("express").Router();
const User = require("../models/user")
const Post = require("../models/post");
const { createConfigProviderProxy } = require("@craco/craco/lib/features/dev-server/create-config-provider-proxy");



// CREATE POST
router.post("/", async (req,res)=>{

    const newPost = new Post(req.body);

    try{

        const savedPost = await newPost.save();

        res.status(200).json({savedPost, success:true});

    }catch(err){
        res.status(500).json(err);
    }

})

// UPDATE POST
router.put("/:id", async (req,res)=>{

    try{

        const post = await  Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
                res.status(200).json({updatedPost, success:true});
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can update only your post");
        }
       
    }catch(err){
        res.status(500).json(err);
    }

})

// DELETE POST
router.delete("/:id", async (req,res)=>{

    try{
        const post = await  Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                await post.delete();
                res.status(200).json({message:"Post deleted successfully", success:true});
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can delete only your post");
        }
       
    }catch(err){
        res.status(500).json(err);
    }

})


// GET ALL POSTS
router.get("/", async (req,res)=>{

    const user = req.query.user
    const category = req.query.category

    try{

        let posts;
        if(username){
            posts = await Post.find({username});
        }else if(category){
            posts = await Post.find({categories:{$in:[category]}})
        }else{
            posts = Post.find();
        }

        res.status(200).json(posts);

       
    }catch(err){
        res.status(500).json(err);
    }

})





module.exports = router;