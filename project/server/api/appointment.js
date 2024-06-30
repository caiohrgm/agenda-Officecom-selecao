const appointmentDB = require('./../services/appointments/database.js')

function create(req, res) {
    appointmentDB.save(req.body).then((val) => {res.status(200).send(val)}).catch(err => {res.status(400).send(err)})
}

function getByDate(req, res) {
    const date = req.query.date
    appointmentDB.showByDate(date).then((val) => {res.status(200).send(val)}).catch(err => {res.status(400).send(err)})
}

function getByCategory(req, res) {
    const category = req.query.category
    appointmentDB.showByCategory(category).then((val) => {res.status(200).send(val)}).catch(err => {res.status(400).send(err)})
}

function remove(req, res) {
    const id = req.params.id
    appointmentDB.remove(id).then((val) => {res.status(200).send(val)}).catch(err => {res.status(400).send(err)})
}

module.exports = { create, getByDate, getByCategory, remove }
