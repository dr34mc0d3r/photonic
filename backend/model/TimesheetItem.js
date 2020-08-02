const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    start_time: {
        type: String,
        required: true,
        min: 3
    },
    end_time: {
        type: String,
        required: true,
        min: 3
    },
    date: {
        type: Date,
        default: Date.now
    },
    discription: {
        type: String,
        required: true,
        min: 3
    }
});

module.exports = mongoose.model('TimesheetItem', userSchema);