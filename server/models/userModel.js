const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

// STATIC SIGNUP METHOD
userSchema.statics.signup = async function (name, email, password) {

    // VALIDATION
    if (!name || !email || !password) {
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email invalid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash, balance: 0 })

    return user
}

// STATIC LOGIN METHOD
userSchema.statics.login = async function (email, password) {

    // VALIDATION
    if (!email || !password) {
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email invalid')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('User not registered')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Password incorrect')
    }

    return user
}

const userModel = mongoose.model('users', userSchema)
module.exports = userModel