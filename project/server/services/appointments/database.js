const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => { err ? console.log("Somethin went wrong connecting to the database"): console.log("Database connected.") });

app = db.run("CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE NOT NULL, description VARCHAR(500) NOT NULL, place VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL)");

function save(appointment) {
    return new Promise((resolve, reject) => {
        let insertAppointment = {$date: appointment.date, $description: appointment.description, $place: appointment.place, $category: appointment.category, }
        db.run("INSERT INTO appointments (date, description, place, category) VALUES($date, $description, $place, $category)", insertAppointment, function (err) {
            if (err) reject(err)
            resolve(this.lastID)
        })
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM appointments WHERE id =?`, id, (err) => {
            if (err) reject (err)
            resolve("Appointment deleted.")
        })
    })
}

module.exports = {save, remove}