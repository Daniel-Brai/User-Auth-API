const User = require("../models/user")
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')
const dotenv = require("dotenv")

dotenv.config({path: './config/.env'})

const signUp = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) { 
        return res.status(400).json({
            error: errors.array()[0].msg,
        })
    }
    const user = new User(req.body)

    await user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            })
        }
        return res.status(201).json({
            message: "User successfully created",
            user
        })
    })
}

const signIn = async(req, res) => { 
    var { name, email, password } = req.body

    User.findOne({email}, (err, user) => { 
        if(err || !user) { 
            return res.status(400).json({
                error: "Email was not found"
            })
        }
    })

    const user = new User(req.body)

    // Authenication for the user
    if(!user.authenicate(password)) { 
        return res.status(400).json({ 
            error: "Email and Passowrd do not match"
        })
    }

    // Create a jwt token
    const token = jwt.sign({_id: user._id }, process.env.SECRET_KEY)

    // put token in cookie
    res.cookie('token', token, { expire: new Date() + 2 })

    // Send a response back
    var { _id, name, email } = user
    return res.json({ 
        token,
        user: { 
            _id, 
            name, 
            email
        }
    })
}

const signOut = ( req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ 
        message: "User signed out successfully"
    })
}
module.exports = { signUp, signIn, signOut }