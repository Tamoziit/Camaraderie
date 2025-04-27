import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useAuthContext } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/landing/Landing'
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import Home from './pages/home/Home'
import CreateGroup from './pages/groups/CreateGroup'
import CurrentTrip from './pages/trips/CurrentTrip'
import Trip from './pages/trips/Trip'

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/home" /> : <Landing />} />
          <Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <SignUp />} />
          <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/"} />} />
          <Route path="/group/create-group" element={authUser ? <CreateGroup /> : <Navigate to={"/"} />} />
          <Route path="/trips/current-trip" element={authUser ? <CurrentTrip /> : <Navigate to={"/"} />} />
          <Route path="/trips/my-trips/:id" element={authUser ? <Trip /> : <Navigate to={"/"} />} />
        </Routes>

        <Toaster />
      </main>
      <Footer />
    </div>
  )
}

export default App;