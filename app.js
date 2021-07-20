//run with nodemon app
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://snissninja:loko1234@cluster0.vqumt.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
      console.log("Successfuly connected to db")
      //listen for requests
      app.listen(3000); 
  })
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs')


//middleware and static files
app.use(express.static('public')); // making the folder public accesible to everywhere
app.use(express.urlencoded({ extended: true }));//for accepting form data
app.use(morgan('dev')); //using ready middleware 'morgan' to preview get

app.get('/', (req, res) => {
  res.redirect('/blogs')
  //res.send('<p>home page</p>');
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render('index', { title: 'Home', blogs });
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

app.use(blogRoutes)
//we could use app.use('/blogs', blogRoutes) --> then to blogRoutes we could
//delete the /blogs from every router.sth('/')

//404page -- works as a catchAll- must be at the bottom
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})