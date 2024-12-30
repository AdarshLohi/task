const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/',(re,res) => {
    res.send('Heloo')
})

app.listen(port, () => {
    console.log(`Server is started on ${port}`)
})