const express = require('express');

const ForumController = require('../controllers/forum-controller');

const router = express.Router();

router.post('/article/create', ForumController.createArticle);
router.get('/article/get', ForumController.getForum);

module.exports = router;