const express = require('express')
const router = express.Router()
const Post = require('../models/posts')
// Define API routes for CRUD operations on blog posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getPost, async (req, res) =>{
    res.json(res.post)
})
  
router.post('/', async (req, res) => {
    const post = new Post({
        author: req.body.author,
        content: req.body.content,
        dateCreated: req.body.dateCreated
    })
    try{
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch(err) {
        res.status(500).json({ message: err.message})

    }
})
  

router.patch('/:id',getPost,async (req, res) => {
    if (req.body.author != null) {
        res.post.author = req.body.author
    }
    if (req.body.content != null) {
        res.post.content = req.body.content
    }
    if (req.body.dateCreated != null) {
        res.body.dateCreated = req.body.dateCreated
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

router.delete('/:id', getPost, async (req,res) =>{
    let deletePost
    try {
        deletePost = res.post
        await deletePost.deleteOne()
        res.json({message : 'Successfully deleted the Post'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
} )

async function getPost(req, res, next) {
    try{
        const post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find any posts'})
        }
        res.post = post
        next()
    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
}
module.exports = router