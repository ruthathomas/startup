import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Game } from './game/game';
import { Animal } from './animal/animal';


export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="nav">
          <h2>bad libs</h2>
          <NavLink className='nav-link' to=''>Login</NavLink>
          <NavLink className='nav-link' to='home'>Home</NavLink>
          <NavLink className='nav-link' to='game'>Game</NavLink>
          <NavLink className='nav-link' to='animal'>Surprise</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/home' element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/animal' element={<Animal />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <footer>
        <span>Ruth Thomas</span>
        <a href="https://github.com/ruthathomas/startup">startup repository :)</a>
      </footer>
    </BrowserRouter>
  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}