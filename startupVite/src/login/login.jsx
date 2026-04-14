import { AuthState } from './authState.js';
import { Authenticated } from './authenticated.jsx';
import { Unauthenticated } from './unauthenticated.jsx';

export function Login({ username, authState, onAuthChange }) {

    if(authState === undefined) {
            getValidated();
        }
    
    async function getValidated() {
        const res = await fetch('/api/auth/me', {
                method: "GET",
            });
        const data = await res.json();
        if(data.validated === 'true') {
            authState = AuthState.Authenticated;
        } else {
            authState == AuthState.Unauthenticated;
        }
    }

    return (
        <main>
            <h1>Bad Libs</h1>
            {authState === AuthState.Authenticated && (
                <Authenticated
                    username={username}
                    onLogout={() => onAuthChange('', AuthState.Unauthenticated)}
                />)}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                    username={username}
                    onLogin={(loginUser) => onAuthChange(loginUser, AuthState.Authenticated)}
                />)}
            {authState === undefined && (
                <div>:((((((((((()))))))))))</div>
            )} 
        </main>
    );
}