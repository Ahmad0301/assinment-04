
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./connection')

const userRoutes = require('./routes/userroutes');
const projectRoutes = require('./routes/projectroutes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);



    app.listen(3000, () => {

        console.log('server is running on port 3000')
    })
  
