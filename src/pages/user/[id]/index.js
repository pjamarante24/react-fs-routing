import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function User() {
  const { id } = useParams()

  return (
    <h2>
      User {id}
      <Link to={`/user/${id}/edit`}> edit</Link>
    </h2>
  )
}
