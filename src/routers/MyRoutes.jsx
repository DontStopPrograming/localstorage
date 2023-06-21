import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { UserAuth } from '../context/AuthContext';
import { Perfil } from '../pages/Perfil';
import { Protector } from '../Components/Protector';
import { Admin } from '../pages/Admin';

export function MyRoutes() {
  const { user } = UserAuth()
  
  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const RequireAdmin = ({ children }) => {
    return user?.email === 'lylylatez@gmail.com' ? children : <Navigate to="/" />;
  };

  const RedirectToLogin = () => {
    return <Navigate to = '/login' />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Protector><Perfil /></Protector>} />
        <Route path = '/login/*' element = {<RedirectToLogin />} />
        
      </Routes>
    </BrowserRouter>
  );
}


