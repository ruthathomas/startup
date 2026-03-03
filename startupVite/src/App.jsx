import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Game } from './game/game';
import { Animal } from './animal/animal';
import { AuthState } from './login/authState';
import { GameAuthState } from './game/gameAuthState';


export default function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
  const currAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currAuthState);
  const [gameState, setGameState] = React.useState(GameAuthState.GameUnvalidated);

  localStorage.setItem('perpetualGameCode', 'ABCDE');

  return (
    <BrowserRouter>
      <header>
        <nav className="nav">
          <h2>bad libs</h2>
          <NavLink className='nav-link' to=''>Login</NavLink>
          {authState === AuthState.Authenticated && (
            <NavLink className='nav-link' to='home'>Home</NavLink>
          )}
          {authState === AuthState.Authenticated && (
            <NavLink className='nav-link' to='game'>Game</NavLink>
          )}
          {authState === AuthState.Authenticated && (
            <NavLink className='nav-link' to='animal'>Surprise</NavLink>
          )}
        </nav>
      </header>
      <Routes>
        <Route path='/' element={
          <Login 
            authState={authState}
            username={username}
            onAuthChange={(username, authState) => {
              setUsername(username);
              setAuthState(authState);
            }}
          />} exact />
        <Route path='/home' element={<Home 
          username={username}
          onAuthChange={(username, authState) => {
              setUsername(username);
              setAuthState(authState);
            }}
          onGameAuthChange={(gameState) => {
            setGameState(gameState);
            console.log(gameState);
          }}
          />} />
        <Route path='/game' element={<Game
          username={username}
          gameState={gameState}
          onGameAuthChange={(gameState) => {
            setGameState(gameState);
            console.log(gameState);
          }}
        />} />
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