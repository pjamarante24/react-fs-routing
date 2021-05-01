import React from 'react'
import { useParams } from 'react-router-dom'

export default function UserEdit() {
  const { id } = useParams()

  return <h2>User Edit {id}</h2>
}
