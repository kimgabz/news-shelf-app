const express = require('express');
const router = express.Router();

const  {auth} = require('../middleware/auth');

// MODEL
const { User } = require('../models/user.model');

router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((error, doc) => {
        if (error) {
            console.error(error);
            return res.json({ success: false });
        }

        res.status(200).json({
            success: true,
            user: doc
        })
    })
});

router.post('/login', async (req, res) => {
    // console.log('login works');
    User.findOne({'email': req.body.email}, (error, user) => {
        if(!user) {
            return res.json({
                auth: false,
                message: 'email or password incorrect',
                userData: false
            });
        }
        user.comparePassword(req.body.password,(error,isMatch)=> {
            if(!isMatch) return res.json({
                auth:false,
                message:'Wrong password',
                userData:false
            });

            user.generateToken((err,user)=>{
                if(error) {
                    return res.status(400).send(error);
                }

                res.cookie('auth',user.token).json({
                    auth:true,
                    userData: {
                        id:user._id,
                        email: user.email,
                        name: user.name,
                        surname: user.surname
                    }
                });
           });
        });
    });
});

router.get('/auth', auth, (req, res) => {
    res.json({
        auth:true,
        userData:{
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            surname: req.user.surname
        }
    })
})

router.get('/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (error, user) => {
        if(error) {
            return res.status(400).send(error);
        }
        res.clearCookie('auth').status(200).send('Logged out');
    })
})

module.exports = router;