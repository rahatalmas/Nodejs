const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const loginRoutes = require('./routes/loginRoutes');
const blogRoutes = require('./routes/blogRoutes');
//app.use(express.urlencoded({extended:false}));
//app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const db = "mongodb+srv://rahatalmas:12345@practiceforprojects.f0dgw.mongodb.net/BlogProject?retryWrites=true&w=majority";
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log('db connected');
    app.listen(PORT,()=>{
        console.log('server running');
    });
});

app.get('/',(req,res)=>{
    res.send('hello world');
    
});

//user login and registration
app.use('/user',loginRoutes);
//blogs
app.use('/blog',blogRoutes);
