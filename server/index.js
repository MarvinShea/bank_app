const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes/routes.js')

require('dotenv').config()

// MIDDLEWARE
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use('/account', routes)

// CONNECT TO DATABASE
mongoose.connect(process.env.REACT_APP_MONGO_URI)
    .then(() => {
        // LISTEN FOR REQUEST
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

