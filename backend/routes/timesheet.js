const router = require('express').Router();
const verifyToken = require('./verifyToken');

const TimesheetItem = require('../model/TimesheetItem');
const {timesheetItemValidation} = require('../validation');


// get list of all timesheet entries
router.get('/', (req, res) => {
// router.get('/', verifyToken, (req, res) => {
    res.json({posts:{title: "sadasddadaddas", description: "dfsdfsdf"}});
});

router.post('/add', verifyToken, (req, res) => {

    //validate before save
    const {error} = timesheetItemValidation(req.body);
    if(error) {
        console.log("19", error);
        return res.status(400).send(error.details[0].message);
    }

    //check to see if item exists for start - end range
    // const emailExists = await TimesheetItem.findOne({email: req.body.email});
    // if(emailExists) return res.status(400).json({ 'error': 'email already exists' });

    const tsItem = new TimesheetItem({
        user_id: req.body.user_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        discription: req.body.discription
    });
    try{
        const savedTimesheetItem = await tsItem.save();
        res.send({user: tsItem._id});
    }catch(err){
        console.log("36", err);
        res.status(400).send(err);
    }
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