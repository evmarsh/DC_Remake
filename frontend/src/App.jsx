import './App.css'
import Home from './pages/Home'
import BookAParty from './pages/BookAParty'
import Menu from './pages/Menu'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppLayout from './components/AppLayout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout layoutType="default" className="main-content flex flex-col min-h-screen bg-transparent w-full pt-16 flex-grow" />}>
        <Route index element={<Home />} />
        <Route path="book_a_party" element={<BookAParty />} />
        <Route path="menu" element={<Menu />} />
      </Route>

      <Route path="/admin" element={<AppLayout layoutType="admin" className="main-content flex flex-col min-h-screen bg-transparent w-full pt-16 flex-grow" />}>
          <Route index element={<Dashboard />} />
      </Route>

      <Route path="*" element={<div className="text-center text-red-500 justify-center">404 Not Found</div>} />
    </Routes>
  );
};

export default App
