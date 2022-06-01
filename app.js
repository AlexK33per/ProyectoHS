process.env.TZ = "Europe/Madrid";

const cors = require("cors");
const express = require("express");
const mongoose = require('mongoose');
require('dotenv');

const app = express();
const http = require('http');
const server = http.createServer(app);
mongoose.set('debug', true);


// require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json());


// MongoDB
const uri = process.env.MONGO_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
};

mongoose.connect(uri, options);
mongoose.connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

// Routers



async function setup_and_launch_server(app) {

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        res.status(404).send();
    });

    server.listen(process.env.PORT || 3000, function () {
        console.log('Listening');
    });
}

setup_and_launch_server(app);