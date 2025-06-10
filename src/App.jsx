import { useState } from 'react'
import './App.css'

export default function App() {
  const persons = [
    { "id": 0, "name": ["David", "👱🏻‍♂️"], "voice": "John", "speak": "I think it’s Sam.", "click": 0, "selected": false },
    { "id": 1, "name": ["Lisa", "👩🏽"], "voice": "Linda", "speak": "Ask David.", "click": 0, "selected": false },
    { "id": 2, "name": ["Sam", "🧑🏿‍🦱"], "voice": "Mike", "speak": "It must be Julia.", "click": 0, "selected": false },
    { "id": 3, "name": ["Julia", "👧🏻"], "voice": "Amy", "speak": "Lisa knows.", "click": 0, "selected": false }
  ]

  const isActive = false;

  return (
    <main>
      <h1>Who ate the cookie? <span className="cookie">🍪</span></h1>
      <h2>Please turn on your speaker.</h2>
      <p className="announcement">You might not get a cookie (maximum API calls are limited). First come, first serve.</p>
      <ul className="speakers">
        {persons.map((person) => (
          <li className={`person ${isActive ? 'active' : ''}`} key={person.id}><p className="name">{person.name[0]}</p><div className="icon">{person.name[1]}</div></li>
        ))}
      </ul>
    </main>
  )
}
