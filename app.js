const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const errorHandler = require('./exceptions/errorHandler');
const configs = require('./config');

mongoose.connect(configs.mongoConnectionString);

const usersRouter = require('./routes/users');

const db = mongoose.connection;
const app = express();
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {

    // we're connected!
    const normalizedPath = path.join(__dirname, 'models');
    fs.readdir(normalizedPath, (err, files) => {
        if (err) {
            console.error('Could not read models');
            process.exit(1);
        }
        files.forEach(file => require(path.join(normalizedPath, file)));
    });

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/users', usersRouter);

    app.use(errorHandler);
});

module.exports = app;
