import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav class="nav">
          <h2>bad libs</h2>
          <a class="nav-link active" href="index.html">Index</a>
          <a class="nav-link" href="home.html">Home</a>
          <a class="nav-link" href="game.html">Game</a>
          <a class="nav-link" href="animal.html">Surprise</a>
        </nav>
      </header>
      <main>
        app stuff go here
      </main>
      <footer>
        <span>Ruth Thomas</span>
        <a href="https://github.com/ruthathomas/startup">startup repository :)</a>
      </footer>
    </BrowserRouter>
  )
}
