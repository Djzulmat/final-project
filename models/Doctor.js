const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name:{
        type: String
    },
    speciality: {
        type: String
    },
    gender: {
        type: String
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;