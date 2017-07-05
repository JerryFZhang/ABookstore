const express = require('express');
const engines = require('consolidate');
// Use synchronous JavaScript call to fetch API id stored in forecast.txt.
// You can replace the forecast.txt with your id.
var app = express();
var path = require('path');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
// Set the default port to localhost 3000.
app.set('port', process.env.PORT || 3000);
// View engine setup
app.set('views', path.join(__dirname, 'views'));
// Parsing coming JSON object
app.use(bodyParser.urlencoded());
// Serving all public content only from ./public
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', engines.mustache);
app.set('view engine', 'html');
// Default landing page
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/category', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/category.html"));
});
app.get('/price', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/price.html"));
});
app.get('/book', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/book.html"));
});
app.get('/book1', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/book1.html"));
});
app.get('/search', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/author.html"));
});
app.get('/author', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/author.html"));
});
app.get('/checkout', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/checkout.html"));
});
app.get('/cart', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/cart.html"));
});
// Custom 404 page.
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// Custom 500 page.
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});
// Start the server
app.listen(app.get('port'), function () {
    console.log('Express started.');
});