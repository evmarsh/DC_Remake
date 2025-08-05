import './App.css'
import Home from './pages/Home'
import BookAParty from './pages/BookAParty'
import Menu from './pages/Menu'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppLayout from './components/AppLayout'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={
          <AppLayout layoutType="default" className="main-content flex flex-col min-h-screen bg-transparent w-full pt-16 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book_a_party" element={<BookAParty />} />
              <Route path="/menu" element={<Menu />} />
            </Routes>
          </AppLayout>
        } 
        />
        <Route path="/admin/*" element={
          <AppLayout layoutType="admin" className="main-content flex flex-col min-h-screen bg-transparent w-full pt-16 flex-grow">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App
