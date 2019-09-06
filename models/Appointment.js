const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_date_time: {
        type: String,
        // required: true
    },
    end_date_time: {
        type: String,
        // required: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;