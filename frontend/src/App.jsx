import './App.css'
import Home from './pages/Home'
import BookAParty from './pages/BookAParty'
import Menu from './pages/Menu'
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
            <Route path="book_a_party" element={<BookAParty />} />
            <Route path="menu" element={<Menu />} />
          </Routes>
      </main>
    </div>
  )
}

export default App
