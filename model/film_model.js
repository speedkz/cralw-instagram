const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    currentStatus: {
        type: String,
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
    },
    realName: {
        type: String,
    },
    tags: {
        type: Array,
    },
    view: {
        type: Number
    },
    actors: {
        type: Array
    },
    directors: {
        type: Array
    },
    country: {
        type: String
    },
    year: {
        type: String
    },
    rateStar: {
        type: String
    },
    votes: {
        type: Number
    },
    duration: {
        type: String
    },
});
module.exports = mongoose.model('film', filmSchema);