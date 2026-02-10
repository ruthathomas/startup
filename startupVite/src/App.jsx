import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

// this is giving us the header and the footer, plus the <main> area, where we can route things
export default function App() {
  return (
    <BrowserRouter>
      <div className="index-body">
        <header>
          <nav className="nav">
            <h2>bad libs</h2>
              <NavLink className="nav-link" to="index">
                Index
              </NavLink>
              <NavLink className="nav-link" to="home">
                Home
              </NavLink>
              <NavLink className="nav-link" to="game">
                Game
              </NavLink>
              <NavLink className="nav-link" to="animal">
                Surprise
              </NavLink>
          </nav>
        </header>
        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/game' element={<Game />} />
            <Route path='/home' element={<Home />} />
            <Route path='/animal' element={<Animal />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}