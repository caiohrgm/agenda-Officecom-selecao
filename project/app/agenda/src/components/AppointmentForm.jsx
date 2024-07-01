/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import addButton from "../assets/addButton.png"

const AppointmentForm = ({addAppointment}) => {

    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [place, setPlace] = useState("")
    const [category, setCategory] = useState("")

    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') 
    const day = String(today.getDate()).padStart(2, '0')

    const formattedToday = `${year}-${month}-${day}`

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!date || !description || !place || !category) return;

        const response = await fetch('http://localhost:3333/appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, description, place, category })
        });

        const data = await response.json()
        
        if (response.ok) {
            addAppointment(data.id, date, description, place, category)
            setDate("")
            setDescription("")
            setPlace("")
            setCategory("")
            alert('Você tem um novo compromisso!');
        } else {
            alert('Houve um erro ao cadastrar um compromisso.');
        }
    }
    
  return (
    <div className="appointment-container">

        <h2 className='new-event-title'>Adicione um novo evento</h2>

        <form id="appointmentForm" className="form" onSubmit={handleSubmit}>

            <input type="date" className="date-input" value={date} id="date" name="date" min={formattedToday} max="2025-12-31" onChange={(e) => setDate(e.target.value)}></input>
            
            <input type="text" className="description-input" value={description} placeholder="Meu compromisso" onChange={(e) => setDescription(e.target.value)}></input>
            
            <input type="text" className="place-input" value={place} placeholder="Local" onChange={(e) => setPlace(e.target.value)}></input>
    
            <select value={category} onChange={ (e) => setCategory(e.target.value)}>
                <option value="" disabled selected>Selecione a categoria</option>
                <option value="Casa">Casa</option>
                <option value="Saúde">Saúde</option>
                <option value="Trabalho">Trabalho</option>
            </select>
           
            <button className='addButtonContainer' type="submit">
                <img src={addButton} className="addButton" />
            </button> 

        </form>
    </div>
  )
}

export default AppointmentForm
