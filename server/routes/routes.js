const express = require('express')
const router = express.Router()
const {
    createUser,
    loginUser,
    allUsers,
    oneUser,
    deposit,
    withdraw,
    transaction,
    getTransaction,
} = require('../controllers/userController')

// CREATE NEW USER
router.post('/create', createUser)

// LOGIN USER
router.post('/login', loginUser)

// GET ALL USERS
router.get('/allUsers', allUsers)

// GET A SINGLE USER
router.get('/user/:email', oneUser)

// MAKE DEPOSIT
router.patch('/deposit', deposit)

// MAKE WITHDRAW
router.patch('/withdraw', withdraw)

// MAKE TRANSACTION
router.post('/transaction', transaction)

// GET TRANSACTION
router.get('/gettransaction/:email', getTransaction)


module.exports = router