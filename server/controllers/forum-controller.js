const Forum = require('../models/forum-model');

createArticle = async (req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to create a article',
        })
    }

    const article = new Forum(body)

    if(!article) {
        return res.status(400).json({ success: false, error: err})
    }

    article
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: article._id,
                message: 'Article created'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'No article created'
            })
        })
}

getForum = async (req, res) => {
    await Forum.find({}, (err, forum) => {
        if(err) {
            return res.status(400).json({ success: false, error: err})
        }
        if(!forum.length) {
            return res
                .stats(404)
                .json({ success: false, error: "No articles found"})
        }
        return res.status(200).json({ success: true, data: forum})
    }).catch(err => console.log(err))
}

module.exports = {
    createArticle,
    getForum,
}