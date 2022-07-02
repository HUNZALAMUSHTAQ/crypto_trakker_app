const Post = require('../models/Post')

exports.getAllPosts = async (req, res, next)=>{
    try {
        let [post, _] = await Post.findAll()
        console.log(post)

        res.status(200).json({post})
    
    } catch (err){
        console.log(err)
        next(err)
    }
}

exports.createNewPost = async (req, res, next)=>{

    try{

        let {title, body} = req.body
        let post = new Post(title, body)
        post = await post.save()
        console.log(post)
        
        res.status(201).json({message: "Post created "})
    
    } catch (err){
        console.log(err)
        next(err)
    }


}

exports.getPostById = async (req, res, next)=>{
    try {
        let postId = req.params.id    
        let [post, _] = await Post.findById(postId)
        console.log(post)

        res.status(200).json({post})
    
    } catch (err){
        console.log(err)
        next(err)
    }
}