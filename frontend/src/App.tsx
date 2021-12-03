import React, { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href='/' className="navbar-brand">
          movieBag
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            movies
          </li>
          <li className="nav-item">
            add
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        
      </div>
    </div>
  )
}

export default App;
