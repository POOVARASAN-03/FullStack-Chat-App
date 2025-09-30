import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import LoginPage from "./pages/LoginPage.jsx";
import SettingPage from './pages/SettingPage'
import  ProfilePage  from './pages/ProfilePage.jsx'
import HomePage from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThmeStore.js';
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
function App() {


  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
  const { theme } = useThemeStore();
  console.log(onlineUsers)
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log(authUser)

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }


  return (
    <div data-theme={theme}>

    <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App