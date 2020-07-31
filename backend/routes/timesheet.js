const router = require('express').Router();
const verifyToken = require('./verifyToken');


// get list of all timesheet entries
router.get('/', verifyToken, (req, res) => {
    res.json({posts:{title: "sadasddadaddas", description: "dfsdfsdf"}});
});

// get timesheet entry for date
// '/timesheet:date'

// get a timesheet by ID - this includes all associated timesheet items
// '/timesheet:id'

// PUT (update) timesheet for ID
// '/timesheet:id'

// delete timesheet by ID - and all associated timesheet items
// '/delete:id'

// new timesheet

module.exports = router;