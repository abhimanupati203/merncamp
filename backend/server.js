import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {readdirSync} from 'fs';

import morgan from 'morgan';

import * as dotenv from "dotenv";

dotenv.config();



const app = express();

// db

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('db connected')).catch((err)=>console.log('db connection error',err));


// middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:['http://localhost:3000']}));
app.use(cors({
    origin:['http://localhost:3000']
})); 

readdirSync('./routes').map((r)=> {
    console.log(`/api/${r}`);
    return app.use('/api',require(`./routes/${r}`))
});

const port =process.env.port ||8000;
app.listen(port,()=> console.log("Server is running"));
