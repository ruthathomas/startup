import React from 'react';

export function Login() {
    return (
        <main>
            <h1>Bad Libs</h1>
            <form method="get" action="home.html">
                <div class="test">
                    <input display="block" type="text" placeholder="username"></input>
                    <input display="block" type="password" placeholder="password"></input>
                    <div>
                        <button type="submit">login</button>
                        <button type="submit">register</button>
                    </div>
                </div>
            </form>
        </main>
    );
}