/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Appointment = ({appointment, removeAppointment, completeAppointment}) => {

  const formatDate = (dateString) => {

    let date = ""
    let splittedDate = ""
    
    if (dateString.includes("/")) {
      splittedDate = dateString.split("/")
      date = new Date(splittedDate[2], splittedDate[1] - 1, splittedDate[0]);
    }
    if (dateString.includes("-")) {
      splittedDate = dateString.split("-")
      date = new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2]);
    }
    
    const dia = String(date.getDate()).padStart(1, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    // console.log(`${dia}/${mes}/${ano}`)

    return `${dia}/${mes}/${ano}`
  }

  return (
    <div className="appointment" style={{textDecoration: appointment.isCompleted ? "line-through" : ""}}>

        <div className="content">
            <span id="span-text" className="date">{formatDate(appointment.date)}</span> 
            <span id="span-text" className="description"> | {appointment.description}</span> 
            <span id="span-text" className="place"> | {appointment.place}</span>
            <span id="span-text" className="category"> | ({appointment.category})</span>
        </div>

        <div className="actionButtons">
            <button className="completed" onClick={() => completeAppointment(appointment.id)}>&#x2713;</button> 
            <button className="cancelled" onClick={() => removeAppointment(appointment.id)}>X</button> 
        </div>
        
    </div> 
  )
}

export default Appointment
