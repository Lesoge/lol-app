const Player = require('../models/player-model');

deleteSummonername = async (req,res) => {
    await Player.findOne({_id: req.params.id}, (err, player) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Player not found'
            })
        }
        player.summonername = undefined;
        player
            .save()
            .then(() => {
                console.log('summoner  deleted')
                return res.status(200).json({
                    success: true,
                    id: player._id,
                    message: 'Summonername deleted',
                })
            })
            .catch(error => {
                console.log('summoner not deleted')
                return res.status(404).json({
                    error,
                    message: 'Summonername not deleted!',
                })
            })
    })
}

setSummonername = async (req, res) => {

    const body = req.body.summonername

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Player.findOne( {_id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Player not found'
            })
        }
        player.summonername = body;
        player
            .save()
            .then(() => {
                console.log('player updated')
                return res.status(200).json({
                    success: true,
                    id: player._id,
                    message: 'Player updated',
                })
            })
            .catch(error => {
                console.log('player not updated')
                return res.status(404).json({
                    error,
                    message: 'Player not updated!',
            })
        })
    })
}

getPlayers = async (req, res) => {
    await Player.find({}, (err, players) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: `Player not found` })
        }
        return res.status(200).json({ success: true, data: players })
    }).catch(err => console.log(err))
}

getPlayerById = async (req, res) => {
    await Player.find( { _id: req.params.id }, (err, players) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: `Player not found` })
        }
        return res.status(200).json({ success: true, data: players })
    }).catch(err => console.log(err))
}


module.exports = {
    setSummonername,
    getPlayers,
    getPlayerById,
    deleteSummonername
}



/*
joinGame()

verifyLeague()

changeElo()
*/