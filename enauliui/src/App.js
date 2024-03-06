import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component';
import Sacco from './components/sacco.component';
import Vehicles from './components/vehicles.component';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              eNauli
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
             
            </div>
          </div>
        </nav>
        
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sacco" element={<Sacco />} />
              <Route path="/vehicles" element={<Vehicles />} />
            </Routes>
         
      </div>
    </Router>
  )
}
export default App