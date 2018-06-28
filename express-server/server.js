// Get dependencies
// const express = require('express');
// const path = require('path');
// const http = require('http');
// const bodyParser = require('body-parser');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const settings = require('./utilities/settings');

import express from 'express';
import path from 'path';
import http from 'http';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as settings from './utilities/settings';

// Get our API routes

// const authRoutes = require('./routes/auth.routes');
// const themeRoutes = require('./routes/theme.routes');
// const stockRoutes = require('./routes/stock.routes');
// const themePropertiesRoutes = require('./routes/themeProperties.routes');
// const stockAllocationRoutes = require('./routes/stockAllocations.routes');
// const adminRoutes = require('./routes/admin.routes');


//routes
// import api from './routes/api';
import authRoutes from './routes/auth.routes';
import themeRoutes from './routes/theme.routes';
import stockRoutes from './routes/stock.routes';
import themePropertiesRoutes from './routes/themeProperties.routes';
import stockAllocationRoutes from './routes/stockAllocations.routes';
import adminRoutes from './routes/admin.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
const dbHost = 'mongodb://mongo-service/mean-docker'
mongoose.connect(dbHost) 
	.then(() => console.log('Connected to MongoDb'))
    .catch(error => console.log('Error connecting to MongoDb'));


app.use(logger('dev'));
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Fix "No 'Access-Control-Allow-Origin'" error by enabling CORS
// Cross Origin middleware
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
    next();
});

// Set our api routes
app.use('/', api);
app.use('/api/auth', authRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/themeproperties/', themePropertiesRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/stockallocations', stockAllocationRoutes);
app.use('/api/admin', adminRoutes);

//error handling
app.use(function (err, req, res, next) {
    console.log('Error handling middleware', JSON.stringify(err))
    return res.status(err.status || 500).json(err);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

export default app;