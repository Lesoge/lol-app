const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Player = require("./player-model")

const Forum = new Schema(
    {
        article: {type: String, required: true},
        author: {type: String, required: true},
        title: {type: String, required: true},
        date: {type: Date, default: Date.now},
    }
)

module.exports = mongoose.model('forum', Forum)