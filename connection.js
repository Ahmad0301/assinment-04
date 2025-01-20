const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/assignment-04')
db= mongoose.connection
db.on('connected',()=>{console.log('mongodb is connected')})
db.on('error',()=>{console.log('error in connection')})
db.on('disconnected',()=>{console.log('mongodb is disconnected')})

module.exports = db