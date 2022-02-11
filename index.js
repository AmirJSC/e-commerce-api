// Dependencies and Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Server & MongoDB setup
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(mongodbConnectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error with MongoDB"));
db.once('open', () => console.log('successfully connected to MongoDB.'));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.listen(port, () => console.log(`Successfully connected to port ${port}`));
