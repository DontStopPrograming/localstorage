import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { UserAuth } from '../context/AuthContext'
import { Perfil } from '../pages/Perfil'
import { Protector } from '../Components/Protector'
import { Admin } from '../pages/Admin'

export function MyRoutes() { 
  const { user } = UserAuth()
  const RequireAuth = ({children}) => {
    return user?children : <Navigate to = '/login' />
  }
  return (
    <BrowserRouter>
     <Routes>
        <Route path = '/' element = {<RequireAuth>
            {user?.email === 'lylylatez@gmail.com' ? (
              <Admin />
            ) : (
              <Home />
              )}
          </RequireAuth>}/>
        
        <Route path = '/login' element = {<Login />} />
        <Route path = '/admin' element = {<Admin />} />
        <Route path = '/home' element = {
          
          <Protector>
            <Home />
          </Protector>
        
        } />
        <Route path = '/perfil' element = {<Protector>
          
          <Perfil />
        </Protector>} />
        
     </Routes>
    </BrowserRouter>
  )
}
