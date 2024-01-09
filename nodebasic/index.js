// const fs = require('fs');
// const http = require("http");
// const fileName = 'target.txt';

// fs.watch('target.txt',()=>{
//     console.log('file changes');
// });
// console.log('Now watching target.tx changes');
// fs.readFile(fileName,(err, data)=>{
//     if(err){
//         throw err;
//     }
//     console.log(data.toString());
// })
// const server =  http.createServer((req, res)=>{
//  res.writeHead(200, {"Content-Type":"text/html"});
//  res.end("Hello from node!");
// });

// server.listen(8000);
// const total = sum(10, 45);

// console.log('gettting started with nodejs' + total);

const express = require('express');
const cors =  require('cors');
const morgan  = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));


app.get('/api/users', function(req,res){
    res.json({
        user:[{
            name:"Ryan",
            age:30
        }]
    });
});

app.listen(8000,()=>console.log('server is running'));