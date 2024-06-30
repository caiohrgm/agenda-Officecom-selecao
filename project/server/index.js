const express = require('express')
const appointmentApi = require('./api/appointment')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({extended: true}))

app.post("/appointment", appointmentApi.create)
app.get("/appointment/date", appointmentApi.getByDate)
app.get("/appointment/category", appointmentApi.getByCategory)
app.delete("/appointment/:id", appointmentApi.remove)

app.listen(3333)