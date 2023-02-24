import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main>
      <h2>Page not found</h2>
      <p>Too Bad...</p>
      <p><Link to='/'>Visit Our Homepage</Link></p>
      </main>
  )
}

export default Missing