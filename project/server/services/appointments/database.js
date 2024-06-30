const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => { err ? console.log("Somethin went wrong connecting to the database"): console.log("Database connected.") });

app = db.run("CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(255), date DATE, description VARCHAR(500))");

function save(appointment) {
    return new Promise((resolve, reject) => {
        let insertAppointment = { $category: appointment.category, $date: appointment.date, $description: appointment.description }
        db.run("INSERT INTO appointments (category, date, description) VALUES($category, $date, $description)", insertAppointment, (err) => {
            if (err) reject(err)
            resolve("Appointment saved.")
        })
    })
}

function showByDate(date) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM appointments WHERE date = '${date}'`, [], (err, rows) => {
            if (err) reject(err)
            rows.forEach((row) => {console.log(row)})
            resolve()
        })    
    })
}

function showByCategory(category) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM appointments WHERE category = '${category}'`, [], (err, rows) => {
            if (err) reject (err)
            rows.forEach((row) => {console.log(row)})
            resolve()
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

module.exports = {save, showByDate, showByCategory, remove}