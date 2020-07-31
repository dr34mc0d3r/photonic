const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req, res) => {
    res.json({posts:{title: "sadasddadaddas", description: "dfsdfsdf"}});
});


module.exports = router;