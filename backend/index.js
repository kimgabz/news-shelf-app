const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.route');
const newsRoutes = require('./routes/news.route');

const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('SERVER RUNNING');
});