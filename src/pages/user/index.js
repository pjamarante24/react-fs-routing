import React from 'react'
import { Link } from 'react-router-dom'

export default function User() {
  return (
    <>
      <h2>User</h2>
      <ul>
        <Link to="/user/1">1</Link>
      </ul>
      <ul>
        <Link to="/user/2">2</Link>
      </ul>
      <ul>
        <Link to="/user/3">3</Link>
      </ul>
    </>
  )
}
