const express = require('express');
const hbs = require('hbs');
const fs= require('fs');
var path =require('path');
var port = process.env.PORT || 3000 ;
var app = express();

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{

  var now =  new Date();
  var log = `${now}: ${req.method} ${req.url}` ;
  console.log(log);
  fs.appendFile('log.js',log + '\n',(err)=>{
    if(err){
      console.log('unable to append File');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentTime',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
});

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about',(req,res)=>{
  // res.send('Hello World!');
  res.render('about.hbs',{
    pageTitle:'About page'
  });
});




// app.get('/about',(req,res)=>{
//   // res.send({
//   //   Name:'Abhinav Dixit',
//   //   Like:'Biking'
//   // });
//   res.render('about.hbs',{
//     TitlePage: 'About Page'
//   });
// });

app.get('/bad',(req,res)=>{
  res.send({
    Error:'Request is bad request'
  });
});
app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
