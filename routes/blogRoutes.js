const express = require('express')
const Blog = require('../models/blog')

const router = express.Router();

//blog routes
router.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })//sort by descending order
    .then((result) => {
      res.render('index', { title: 'All blogs', blogs: result }) //first argument is what we wnat to render = the index view 
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/blogs', (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' })
})

router.get('/blogs/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details'})
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog NOT found'})
    })
})

router.delete('/blogs/:id', (req, res) => {
  const id = req.params.id 

  Blog.findByIdAndDelete(id)
    .then(result => { //when we re recieving an ajax request, wecant respond with a redirect
      res.json({ redirect: '/blogs' }) //we have to send json(with a redirect propert, which is gonna be used from frontend) or textdata
    })
    .catch(err => {
      console.log(err)
    })
})



module.exports = router;
//mongoose and mongo sandbox routes
// app.get('/add-blog',(req, res) => {
//   const blog = new Blog({
//     title: 'New blog 2',
//     snippet: 'About my new blog',
//     body: 'More about my new blog'
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) =>{
//       console.log(err);
//     });
// })

// app.get('/all-blogs', (req,res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

// app.get('/single-blog',(req,res) => {
//   Blog.findById('60f67949be1d7102085b569b')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })