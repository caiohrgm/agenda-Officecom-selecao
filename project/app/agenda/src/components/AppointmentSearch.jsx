/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const AppointmentSearch = ({search, setSearch}) => {
  return (
    <div className='search'>
        <input type="text" className="search-bar" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Buscar por data, descrição, local ou categoria...' ></input>
    </div>
  )
}

export default AppointmentSearch
