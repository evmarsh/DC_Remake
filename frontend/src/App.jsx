import './App.css'
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="main-content flex min-h-screen bg-transparent">
      <NavBar />
      <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
      </main>
    </div>
  )
}

export default App
