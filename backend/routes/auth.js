const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');





router.post('/register', async (req, res) => {

    //validate before save
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check to see if email already registered
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).json({ 'error': 'email already exists' });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    console.log('Login attempt');
    //validate before login
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({ 'error': error.details[0].message });

    //check to see if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({ 'error': 'Incorrect email or password' });

    //is password correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({ 'error': 'Incorrect email or password' });

    //create token
    const token = jwt.sign({_id: user._id, name: user.name}, process.env.JWT_SECRET);
    res.header('auth-token', token).json(token);

});

module.exports = router;