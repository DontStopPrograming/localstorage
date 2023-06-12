import { useEffect } from 'react' 
import logo from '../assets/google.svg'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import '../App.css'

import imgLogin from '../assets/guapa.jpg'

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
      <div className = 'containerLogin'>
        <img className = 'imagesLogin' src = {imgLogin} />
        <button className = 'btnIniciar' onClick = {iniciarSesion}>
        <span> Iniciar con Gmail</span>
        </button>
      </div>
    </>
  )
}
