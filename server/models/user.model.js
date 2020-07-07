const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 100
    },
    surname: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token:{
        type: String
    }
});

userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I, (error, salt) => {
            if (error) {
                return next(error);
            }

            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) {
                    return next(error);
                }

                user.password = hash;

                next();
            })
        })

    }
});

userSchema.methods.comparePassword = function(candidatepassword, cb) {
    let user = this;

    bcrypt.compare(candidatepassword, user.password, (error, isMatch) => {
        if (error) {
            return cb(error)
        }

        cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function(cb) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), config.SECRET);

    // user.token = token;
    user.updateOne({ token: token }, function(error, doc) {
        if (error) {
            return cb(error);
        }
        cb(null, user);
    });
}

userSchema.statics.findByToken = function(token, cb){
    let user = this;

    jwt.verify(token, config.SECRET, (error,decode) => {
        user.findOne({"_id": decode, "token": token}, (error, user) => {
            if(error) {
                return cb(error);
            }
            cb(null, user);
        })
    })
}

userSchema.methods.deleteToken = function(token, cb) {
    let user = this;

    user.updateOne({$unset:{token:1}}, (error, user) => {
        if(error) {
            return cb(error);
        }
        cb(null,user);
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User }