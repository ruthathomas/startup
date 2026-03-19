import { AuthState } from './authState.js';
import { Authenticated } from './authenticated.jsx';
import { Unauthenticated } from './unauthenticated.jsx';

export function Login({ username, authState, onAuthChange }) {
    return (
        <main>
            <h1>Bad Libs</h1>
            {authState === AuthState.Authenticated && (
                <Authenticated
                    username={username}
                    onLogout={() => onAuthChange(username, AuthState.Unauthenticated)}
                />)}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                    username={username}
                    onLogin={(loginUser) => onAuthChange(loginUser, AuthState.Authenticated)}
                />)}
        </main>
    );
}