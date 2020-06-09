const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Player = new Schema( 
	{
		elo: {type: Number, default: 0},
		summonername: String,
		username: {type: String, required: true},
		password: {type: String, required: true},
		email: {type: String, required: true},
		date: {type: Date, default: Date.now},
		reported: {type: Number, default: 0},
	}
)

module.exports = mongoose.model('players', Player)