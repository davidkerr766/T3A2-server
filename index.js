require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = process.env.PORT || '4000'

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.5w7cn.mongodb.net/dev?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Atlas")
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/users', require('./routes/userRouter'));
app.use('/api/blogs', require('./routes/blogRouter'))

app.listen(port, () => `Listening on port: ${port}`)
