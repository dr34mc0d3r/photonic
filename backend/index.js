// https://www.youtube.com/watch?v=2jqok-WgelI



const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));


//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to db');
    }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//middlewhare
// app.use(bodyParser.json());
// app.use(express.json());

app.use(express.static(path.join(__dirname, '/dist/')));

//Route Middlewhare
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// https://www.youtube.com/watch?v=jF5pFmLJwWs
// Modern Web Design Patterns in Angular 8 : Using Express.js and Node.js to Serve Angular
app.get('/app', (req, res) => {
    var options = {
        root: path.join(__dirname, '/dist/')
    };

    return res.sendFile('index.html', options);
});





const port = 3002;
app.listen(port, err => {
    if (err) {
        return console.log("Error: ", err);
    }
    console.log('Server listening on port: ' + port);
})