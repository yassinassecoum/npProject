const router = require('express').Router();
const Post = require('../model/Post');
router.post('/add' ,(req,res) =>{
    const newPost = new Post({
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        img:req.body.img,
        user:req.body.user,
        site:req.body.site
    })
    newPost.save();
    res.json("Good")

})
router.get('/' ,(req,res) =>{
    Post.find({},function(err,posts){
        if(err){
            res.status(400).send("error")
        }
        res.json(posts)
    })

})
router.post('/delete' ,(req,res) =>{
    console.log(req.body.idDelete)
    Post.deleteOne({_id : req.body.idDelete},(err) =>{
        console.log(err)
    })
    res.json("good")

})


module.exports = router;