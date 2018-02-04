import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (  
    <ul>{person.name}: {person.number} <button onClick={deletePerson}>poista</button>
    </ul>
  )
}

export default Person