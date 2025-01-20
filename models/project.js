const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  status: { type: String, enum: ['proposed', 'completed'], default: 'proposed' },
});

module.exports = mongoose.model('Project', ProjectSchema);

// {
//     "title":"",
//         "":"",
//     "description":"",

//     "studentId":"",

//     "supervisorId":"",

//     "status":""

// }
