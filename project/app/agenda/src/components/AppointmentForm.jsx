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
    const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0')

    const formattedToday = `${year}-${month}-${day}`

    const handleSubmit = (e) => {

        e.preventDefault()

        if (!date || !description || !place || !category) return;// Se tiver campso vazios, faz nada.

        addAppointment(date, description, place, category)
        setDate("")
        setDescription("")
        setPlace("")
        setCategory("")
    }
    
  return (
    <div className="appointment-form">

        <h2>Adicione um compromisso</h2>

        <form className="form" onSubmit={handleSubmit}>
            
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
