const userModel = require('../models/userModel');
const transactionModel = require('../models/transactionModel.js')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1h' })
}
// CREATE NEW USER
async function createUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await userModel.signup(name, email, password)

        // CREATE A TOKEN
        const token = await createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


// LOGIN USER
async function loginUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await userModel.login(email, password)

        // CREATE A TOKEN
        const token = await createToken(user._id)

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// GET ALL USERS
async function allUsers(req, res) {
    // GET ALL USERS FROM DB
    try {
        const users = await userModel.find({});

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// GET A SINGLE USER
async function oneUser(req, res) {
    const { email } = req.params
    // GET SINGLE USER FROM DB
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user);
};

async function deposit(req, res) {
    const { email, balance } = req.body
    // UPDATE USER DEPOSIT
    const deposit = await userModel.findOneAndUpdate({ email }, { balance });
    res.status(200).json(deposit);
}

async function withdraw(req, res) {
    const { email, balance } = req.body
    // UPDATE USER WITHDRAW
    const withdraw = await userModel.findOneAndUpdate({ email }, { balance })
    res.status(200).json(withdraw)
}

async function transaction(req, res) {
    const { name, email, transactionType, amount, balance } = req.body;
    const transaction = transactionModel.create({ name, email, transactionType, amount, balance })
    res.status(200).json(transaction)
}

// GET TRANSACTIONS
async function getTransaction(req, res) {
    // GET ALL USERS FROM DB
    const { email } = req.params
    try {
        const transactions = await transactionModel.find({ email });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    createUser,
    loginUser,
    allUsers,
    oneUser,
    deposit,
    withdraw,
    transaction,
    getTransaction,
}