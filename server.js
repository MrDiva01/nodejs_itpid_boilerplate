require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
const multer = require('multer');
const path = require('path');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// API routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/category', require('./category-based/category.controller'));
app.use('/expensetracker', require('./expensetracker/expensetracker.controller'));
app.use(errorHandler);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
//asdasd