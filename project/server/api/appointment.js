const appointmentDB = require('./../services/appointments/database.js')

function create(req, res) {
     appointmentDB.save(req.body).then((val) => {res.status(200).json({id:val})}).catch(err => {res.status(400).send(err)})
}

function remove(req, res) {
    const id = req.params.id
    appointmentDB.remove(id).then((val) => {res.status(200).send(val)}).catch(err => {res.status(400).send(err)})
    
}

module.exports = { create, remove }
