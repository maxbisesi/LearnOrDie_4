const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const mime = require('mime');

const app = express();
const port = process.env.PORT || 4242;
// encapsulate all paths in this one router rather than having them all spread out:
const router = express.Router();

// morgan logging
app.use(morgan('combined'));

// let express know you are using a router ->
// define your paths
app.use('/', router);
app.use('/books', router);

// set which view folder to use
app.set('views', './src/views');
// use pug
// app.set('view engine', 'pug');
// use ejs
app.set('view engine', 'ejs');

// Set Headers for static files:
let jsheaders = {
  setHeaders: function(res,stat,path){
    res.set('Content-Type',mime.getType('js'));
  }
}
let cssheaders = {
  setHeaders: (res,stat,path) => {
    res.set('Content-Type',mime.getType('css'));
  }
}
let imageheaders = {
  setHeaders: (res,stat,path) => {
    res.set('Content-Type',mime.getType('svg'));
  }
}
// Tell apppress to use static files ->
app.use(express.static(path.join(__dirname, '/public/js'),jsheaders));
app.use(express.static(path.join(__dirname, '/public/css'),cssheaders));
app.use(express.static(path.join(__dirname, '/public/images'),imageheaders));

// use bootstrap and jquery as a node module.
app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'),cssheaders)
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js'),jsheaders)
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist'),jsheaders)
);


// in express you define a listener for each url
// use .sendFile to serve an html file
const books = []
router.route('/').get((req, res) => {
  // render the books.ejs page and pass in the options
  res.set('Content-Type', mime.getType('html'));
  res.render('index');
});

/* app.use('/', (req, res) => {
  // use .send to send anything to the requester
  console.log(`Serving: ${chalk.green('FLASH CARD SHARK')}`);
  // __dirname is the appecuting contappt
  // res.sendFile(__dirname + '/views/Home.html');
  // res.sendFile(path.join(__dirname, '/views/Home.html'));

  // use res.render to render a template file
  // node should lool in view folder since thats what you set earlier ^

  // render a view called index
  // second arg pass in parameters to be used on the page:
  // res.render('index', { title: 'My FCS', list: ['a', 'b'] });
  res.render('index', {
    title: 'Books',
    nav: [
      { link: '/books/', title: 'books' },
      { link: '/authors', title: 'tools' }
    ]
  });
}); */

/* to implement another page, set the listener here !
app.get('/about', (req, res) => {
  // use .send again
  res.send('Hello About !');
});
*/

app.listen(port, () => {
   console.log(`express on port ${chalk.red(port)}`);
   console.log(`${chalk.blue(mime.getType('js'))}`);
   console.log(`${chalk.green(mime.getType('html'))}`);
   console.log(`${chalk.yellow(mime.getType('svg'))}`);
});
