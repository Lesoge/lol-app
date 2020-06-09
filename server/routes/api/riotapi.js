const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const Player = require('../../models/player-model');

const request = require('request');

const https = require('https');

router.get("/player/:summonername", async (req, response) => {

    const summonername = req.params.summonername;
    console.log(summonername)

    await request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonername + '?api_key=' + keys.riotAPIkey, { json: true },
        (err, res, body) => {
            const status = res.statusCode;
            if (status == 200) {
                return  response.status(200).json({ success: true, body: body })
            }
            else {
                return response.status(status).json({ success: false, error: err })
            }
        })
});


router.get("/lolacc/:id", async (req, response) => {

    var summonername;

    await Player.findOne( {_id: req.params.id }, (err, player) => {
        if(err) {
            return response.status(400).json({ success: false, error: err })
        }
        summonername = player.summonername;
        if (summonername == undefined) {
            return response.status(400).json({
                success: false,
                error: 'You must provide a body to update',
            })
        }

        request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonername + '?api_key=' + keys.riotAPIkey, { json: true },
            (err, res, body) => {
                const status = res.statusCode;
                if (status == 200) {
                    return  response.status(200).json({ success: true, body: body })
                }
                else {
                    return response.status(status).json({ success: false, error: err })
                }
            })
    })


});

router.get("/rankedstats/:id", async (req, response) => {

    var summonername;

    await Player.findOne( {_id: req.params.id }, (err, player) => {
        if (err) {
            return response.status(400).json({ success: false, error: err })
        }
        summonername = player.summonername;
        if (summonername == undefined) {
            return response.status(400).json({
                success: false,
                error: 'You must provide a body to update',
            })
        }

        request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonername + '?api_key=' + keys.riotAPIkey, { json: true },
            (err, res, body) => {
                const status = res.statusCode;
                if (status == 200) {
                    const id = body.id;
                    request('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + id + '?api_key=' + keys.riotAPIkey, { json : true },
                        (err, res, body2) => {
                            const status2 = res.statusCode;
                            if (status2 == 200) {
                                return response.status(200).json({ success: true, body: body2})
                            }
                            else {
                                return response.status(status).json({ success: false, error: err })
                            }
                        })
                }
                else {
                    return response.status(status).json({ success: false, error: err })
                }
            })
    })

})

module.exports = router;


