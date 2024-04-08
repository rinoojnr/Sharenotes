const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    userid: {
        type: Schema.types.ObjectId,
        ref: 'user'
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    }
});

module.exports = mongoose.model('notes', notesSchema);