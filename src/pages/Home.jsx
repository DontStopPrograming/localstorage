import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { CloseSesion } from '../Components/CloseSesion'

import { Link } from 'react-router-dom'

export function Home() {
  const { user, logOut } = UserAuth()

  const cerrarSesion = async() => {
    try {
      await logOut()
      Navigate('/login')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1> This is the Home </h1>
      {user && (
        <>
        <p> This is Home {user.displayName} </p>
        <button onClick = { cerrarSesion }> Cerrar Sesion </button>
        </>
      )}
      {!user && <Navigate to = '/login'/>}
      <button>
        <Link to = '/admin'> Regresar al Admin </Link>
      </button>
    </>
  )
}
