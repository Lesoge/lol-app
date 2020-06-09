const express = require('express');

const PlayerController = require('../controllers/player-controller');

const router = express.Router();

router.post('/summonername/:id', PlayerController.setSummonername);
router.get('/getplayers', PlayerController.getPlayers);
router.get('/getplayer/:id', PlayerController.getPlayerById)
router.post('/deletesummonername/:id', PlayerController.deleteSummonername)



module.exports = router;


