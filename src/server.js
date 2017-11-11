const express = require('express');
const hbs = require('hbs');
const port = 3000;
var app = express();

app.set('view engine', 'hbs');
//connect to public pages...
app.use(express.static(__dirname + '/../views'));
//home page get method
app.get('/', (req, res) => {
  res.render('index.hbs');
});


//get method to recieve data
app.get('/getdata', (req, res) => {
  console.log(req);
});

app.listen(port, () => {
  console.log(`Server starting on ${port}...`);
});
