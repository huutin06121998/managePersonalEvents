const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const eventsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    due_date: {
        type: Date,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

const exportModelEvent = mongoose.model('events', eventsSchema);
module.exports = exportModelEvent;
