
// imports
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const SQL = require('./dbconfig')

//inits
const app = express()
const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
}
const sessionOption = {
    secret: "theHolySecretWord",
    name: "session",
    saveUninitializer: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}

//middlewares
app.use(express.json())
app.use(cors(corsOption))
app.use(session(sessionOption))

app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))


app.listen(1000, () => console.log("Server is up"))
