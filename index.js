/**
 * @DESCRIPTION : THIS IS EXPRESS/NODE SERVER ENTRY POINT
 * @METHODS : DB CONNECTION, SETTING REQ-RES HEADERS , SERVERLOGS , SERVER ROUTES ,SETTING UP ALL MIDDLEWARES, START SERVER
 * @AUTHOR : BHAGVAT LANDE , 25 JULY 2020 
 */

// IMPORT ALL EXTERNAL MODULES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// IMPORT INTERNAL APP DEPENDENCIES 
// INITIALIZE EXPRESS MIDDLEWARE 
const app = express();

// DATABASE CONNECTION
mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function (err) {
    console.log(err);
    if (err) throw console.log("Error  : DB Not connected");
});

// ENABLE CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// INITIALIZE ALL MIDDLEWARES 
// MORGAN - SERVER LOGS MIDDLEWARE
app.use(morgan('dev'));

// SETUP STATIC ASSESTS DIRECTORY
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ADD BODY-PARSER 
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ADD ALL ROUES HERE
app.get('/', function (req, res) {
    res.send("App Working.....");
});

app.use('/outlet', require('./routes/location.routes'));

//START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('server is running at port :' + PORT);
