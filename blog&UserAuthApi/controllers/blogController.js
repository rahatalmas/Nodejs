const Blog = require('../models/BlogModel');

const getBlogs = (req,res,next)=>{
    Blog.find()
    .then(blogs=>{
        res.send(blogs);
    })
    .catch(err=>{
        console.log(err);
    })
}

const writeBlog = (req,res,next)=>{
    //const title = ;
    //const content = ;
    const blog = new Blog({
        title:req.body.title,
        content:req.body.content
    });
    blog.save()
    .then(result=>{
        res.send(`blog posted ${result}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

const singleBlog = (req,res,next)=>{
    const _id = req.params.id;
    Blog.findById(_id)
    .then(blog=>{
        res.send(blog);
    })
    .catch(err=>{
        res.send(err)
    })
}

const deleteBlog = (req,res,next)=>{
    const _id = req.params.id;
    Blog.findByIdAndRemove(_id)
    .then(result=>{
        res.send(`blog deleted : ${result}`)
    })
    .catch(err=>{
        console.log(err)
    })
}

const updateblog = (req,res,next)=>{
    const _id = req.params.id;
    Blog.findByIdAndUpdate(_id,req.body)
    .then(()=>{
        Blog.findOne({_id})
        .then(blog=>{
            res.send(blog);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports ={
    getBlogs,
    writeBlog,
    singleBlog,
    deleteBlog,
    updateblog
}