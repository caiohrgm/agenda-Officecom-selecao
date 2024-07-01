const express = require('express')
const appointmentApi = require('./api/appointment')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const port = 3333

app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
    origin:'http://localhost:5173'
}))

app.post("/appointment", appointmentApi.create)
app.delete("/appointment/:id", appointmentApi.remove)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})