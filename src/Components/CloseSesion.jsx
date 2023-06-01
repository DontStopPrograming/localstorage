import { UserAuth } from "../context/AuthContext"

export function CloseSesion() {
    const { user } = UserAuth()
  return (
    <>
        {user && (
            <button onClick = {cerrarSesion}> Cerrar Sesion</button>
        )}
    </>
  )
}
