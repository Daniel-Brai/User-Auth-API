const mongoose = require('mongoose');
const crypto = require('crypto')
const { v1: uuidv1 } = require("uuid")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 40,
        trim: true,
    },
    lastname: {
        type: String,
        maxLength: 40,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    encrypted_password: {
        type: String,
        required: true,
    },
    salt:  String,
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

userSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.encrypted_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.method({
    authenicate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encrypted_password
    },
    securePassword: function(plainpassword) {
        if (!plainpassword) {
            return ""
        }
        try {
            return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
        } catch(err) {
            return "Something went wrong!"
        }
    },
})

module.exports = mongoose.model("User", userSchema)



