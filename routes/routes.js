const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { signUp, signIn, signOut } = require("../controllers/controllers")

// For sign up request and valation of fields
router.post(
    '/signup',
    [
        check("name", "Your name should be at least 3 characters long").isLength({min: 3}),
        check("email", "Enter a valid email address").isEmail(),
        check("password", "Password should be at least 6 characters long").isLength({min: 6}),
    ]
    ,signUp
)

//  For sign in request 
router.post(
    '/signin', 
    signIn
)

// For sign out request 
router.get(
    '/signout', 
    signOut
)

module.exports = router