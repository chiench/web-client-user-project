import React from 'react'
import { Outlet } from 'react-router-dom'

export default function guestlayout() {
  return (
    <div>
        Guest Layout
        <Outlet/>
    </div>
  )
}
