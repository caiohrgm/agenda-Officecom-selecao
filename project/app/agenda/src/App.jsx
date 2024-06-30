import { useState } from "react";
import AppointHereLogo from "./assets/AppointHere_logo.png";
import "./App.css";
import AppointmentForm from "./components/AppointmentForm";
import Appointment from "./components/Appointment";
import AppointmentSearch from "./components/AppointmentSearch";

function App() {
  const [search, setSearch] = useState("")
  const [appointments, setAppointments] = useState([
    {
      id:1,
      date: "30/06/2024",
      description:"Criar funcionalidade nova",
      place: "OfficeCom",
      category:"Trabalho",
      isCompleted: false
    },
    {
      id:2,
      date: "01/07/2024",
      description:"Comprar Tomates",
      place: "Supermercado carrefour",
      category:"Casa",
      isCompleted: false
    },
    {
      id:3,
      date: "05/07/2024",
      description:"Ir para a academia",
      place: "Clinica do Atleta",
      category:"Saúde",
      isCompleted: false
    },
  ])

  const addAppointment = (date, description, place, category) => {
    const newAppointments = [...appointments, {
      id: Math.floor(Math.random() * 1000),
      date,
      description,
      place,
      category,
      isCompleted: false
    }]

    setAppointments(newAppointments) // Atualiza o estados dos appointments com os novos appointments
  }

  const removeAppointment = (id) => {
    const newAppointments = [...appointments]
    const filteredAppointments = newAppointments.filter(appointment => appointment.id !== id ? appointment : null)
    setAppointments(filteredAppointments)
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

        <h1>Meus Compromissos</h1>

        <AppointmentSearch search={search} setSearch={setSearch}/>

        <div className="appointment-list">
          {appointments.filter((appointment) => appointment.date.includes(search) || appointment.description.toLowerCase().includes(search.toLowerCase()) || appointment.place.toLowerCase().includes(search.toLowerCase()) || appointment.category.toLowerCase().includes(search.toLowerCase())).map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} removeAppointment={removeAppointment} completeAppointment={completeAppointment} />
          ))}
        </div>

        <AppointmentForm addAppointment={addAppointment} />

      </div>
    </div>
  );
}

export default App;

