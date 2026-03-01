import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateJob from './pages/CreateJob'
import EditJob from './pages/EditJob'
import JobDetailsPage from './pages/JobDetailsPage'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
      </Routes>
    </>
  )
}

export default App
