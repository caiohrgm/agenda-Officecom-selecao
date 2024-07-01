import { useState } from "react";
import AppointHereLogo from "./assets/AppointHere_logo.png";
import "./App.css";
import AppointmentForm from "./components/AppointmentForm";
import Appointment from "./components/Appointment";
import AppointmentSearch from "./components/AppointmentSearch";

function App() {
  const [search, setSearch] = useState("")
  const [appointments, setAppointments] = useState([])

  const addAppointment = (id, date, description, place, category) => {
    const newAppointments = [...appointments, {
      id,
      date,
      description,
      place,
      category,
      isCompleted: false
    }]

    setAppointments(newAppointments) 
  }

  const removeAppointment = async (id) => {
  
    const response = await fetch(`http://localhost:3333/appointment/${id}`, {
      method:'DELETE'
    })

    if (response.ok) {
      const newAppointments = [...appointments]
      const filteredAppointments = newAppointments.filter(appointment => appointment.id !== id ? appointment : null)
      setAppointments(filteredAppointments)
      alert('Compromisso deletado com sucesso.')
    } else {
      alert('Erro ao deletar o compromisso.')
    }
  }

  const completeAppointment = (id) => {
    const newAppointments = [...appointments]
    newAppointments.map( (appointment) => appointment.id === id ? appointment.isCompleted = !appointment.isCompleted : appointment)
    setAppointments(newAppointments)
  }

  return (
    <div>

      <nav id="navBar">
        <img id="logo" src={AppointHereLogo} className="AppointHereLogo" />
      </nav>

      <div className="appointmentListContainer">

        <h1 className="agenda-title">Compromissos & Tarefas</h1>

        <AppointmentSearch search={search} setSearch={setSearch}/>

        <div className="appointment-list">
          {appointments.filter((appointment) => appointment.date.includes(search) || 
          appointment.description.toLowerCase().includes(search.toLowerCase()) || 
          appointment.place.toLowerCase().includes(search.toLowerCase()) || 
          appointment.category.toLowerCase().includes(search.toLowerCase())).map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} removeAppointment={removeAppointment} completeAppointment={completeAppointment} />
          ))}
        </div>

        <AppointmentForm addAppointment={addAppointment} />

      </div>
    </div>
  );
}

export default App;

