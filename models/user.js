const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = require('mongoose')


const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'supervisor'], required: true },
  department: { type: String },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);


// {
    
//     "name": "muhammad qasim",
//     "password": "123456",
//     "email":"operating system",
//     "role":"haroon abdul waheed",
//     "department":"null"

   

// }
   

   


