import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRotes:React.FC = () => {
    const token = localStorage.getItem("accessToken")
  return (
    !token ? <Outlet/> : <Navigate to={'/monitor'} />
  )
}

export default PublicRotes