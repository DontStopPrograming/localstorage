import { useEffect } from 'react' 
import logo from '../assets/google.svg'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const { user, googleSignIn } = UserAuth()
  const iniciarSesion = async() => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(user !=null){
      navigate('/')
    }
  }, [user])

  return (
    <>
      <button className = 'btnIniciar' onClick = {iniciarSesion}>
        <span> Iniciar con Gmail</span>
      </button>
    </>
  )
}
