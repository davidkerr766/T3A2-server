require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

let database
if (process.env.ENV == "test") {
    database = "test"
} else {
    database = "prod"
}
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.5w7cn.mongodb.net/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Atlas")
});

app.use(cors({
    origin: "https://nourished-to-health.netlify.app/",
    credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/users', require('./routes/userRouter'));
app.use('/api/images', require('./routes/awsRouter'));
app.use('/api/blogs', require('./routes/blogRouter'))
app.use('/api/recipes', require('./routes/recipeRouter'))

module.exports = {app, db}