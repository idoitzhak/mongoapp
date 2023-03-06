import express from "express";
import mongoose from "mongoose";
import actions from './controllers/actions.js';

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url = "mongodb+srv://idoitzhak5:esPErn00a5KUAAku@cluster0.hpoykip.mongodb.net/?retryWrites=true&w=majority";

const port = 3001;

app.use('/api',actions);

mongoose.connect(mongo_url)
.then(results => {
    console.log(results);
    app.listen(port,function(){
        console.log(`Server is running via port ${port}`);
    })
})
.catch(error => {
    console.log(error);
})

