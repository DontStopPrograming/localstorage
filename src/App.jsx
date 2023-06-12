import './App.css'
import { AuthContextProvider, UserAuth } from './context/AuthContext'
import { MyRoutes } from './routers/MyRoutes'

function App() {
  
  return (
    <>
    <AuthContextProvider>
      
        <MyRoutes />
      
    </AuthContextProvider>
     
    </>
  )
}

export default App
