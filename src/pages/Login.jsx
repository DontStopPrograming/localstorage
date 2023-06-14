import { useEffect } from 'react' 
import logo from '../assets/google.svg'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import '../App.css'

import imgLogin from '../assets/guapa.png'
import imgUser from '../assets/user.png'

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
    <div style = {{ background: '#F0CF56', height: '100vh'}}>
      <div className = 'containerLogins'>

      <div className='resumenApp'>
          <h2> Restaurant App </h2>
          <p> Mira sobre nuestra cartelera de menús, tenemos variedad de platillos. Ven y disfruta, también atendemos delivery según tu zona</p>
        </div>
        
        <div className = 'containerLogin'> 
          <img src = {imgLogin} />
        </div>
        <div className = 'containerIniciar'>
          
          <img className='iconUser' src={imgUser} alt="usuario icon" />
          
          <button onClick = {iniciarSesion}>
            <img className='logoGoogle' src={logo} alt='google logo' style = {{width: '30px', objecFit: 'cover', float: 'left', top: '0px'}} />
          <span style = {{ color: '#fff', fontSize: '15px'}}> Iniciar con Gmail</span>
        </button>
        </div>
        
      </div>
    </div>
  )
}
