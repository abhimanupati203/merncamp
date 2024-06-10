const express =  require('express');
const app = express();
const morgan =require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});


const postRoutes= require('./routes/posts');
const authRoutes= require('./routes/auth');
const userRoutes= require('./routes/users');
// apiDocs
app.get('/api', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

const myOwnMiddleware = (req, res, next)=>{
    console.log('middleware applied!!!');
    next();
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

// app.use(myOwnMiddleware);
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send({error:'unauthorized'});
    } else {
      next(err);
    }
  });


const port = 8080;
app.listen(port,()=>{console.log('A Node js API')});