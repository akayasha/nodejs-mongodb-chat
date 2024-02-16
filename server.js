const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const chatRoutes = require('./routes/chatRoutes');
const interestRoutes = require('./routes/interestRoute');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        // Check if the database exists
        mongoose.connection.db.listCollections().toArray(function(err, collections) {
            if (err) {
                console.log(err);
            } else {
                console.log('Collections in the database:');
                collections.forEach(collection => {
                    console.log(collection.name);
                });
            }
        });
    })
    .catch(err => console.log(err));

// Routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', chatRoutes);
app.use('/api', interestRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
