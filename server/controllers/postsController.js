const Post = require('../models/Post');
const User = require('../models/User');

const createPost =  async (req, res) => {
    try{
      const user = await User.findById(req.user.id);
      if(!user){
        return res.status(400).json({message:"User Not Found Please Login First"})
      }
  
      const newPost = new Post({
        createdBy: req.user.id,
        message: req.body.message,
      })
      
      const post = await newPost.save();
      console.log(post);
      res.json(post);
  
    }catch(err){
      console.log(err.message);
      res.status(500).json({message: err.message});
    }
  }



const editPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post Not Found"});
        }

        let flag = post.createdBy.toString() === req.user.id;
        if(!flag){
            return res.status(401).json({message: "InValid User or Not Authorized"});
        }

        post.message = req.body.message
        post.updatedAt = Date.now();

        await post.save();

        res.json(post);


    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
  }

  const deletePost =  async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post Not Found"});
        }

        let flag = post.createdBy.toString() === req.user.id;
        if(!flag){
            return res.status(401).json({message:"Not Authorized"});
        }

        await Post.deleteOne({_id: req.params.id});
            
        res.status(200).json({message:"Post Deleted"});

       

        

    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Server Error "});
    }

  }

  const getPosts = async (req, res) => {
    try{
        const posts = await Post.find({});
        res.status(200).json(posts);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Server Error "});
    }
  }


  module.exports = {createPost,editPost,deletePost,getPosts};