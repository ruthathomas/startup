import React from 'react';
import { Link } from 'react-router-dom';

export function Animal() {
    return (
        <main style={{margin: 1 + 'rem'}}>
            <h1>Bear Libs</h1>
            <div className="test">
                <p style={{padding: 0, marginTop: 0.5 + 'rem', marginBottom: 0.5 + 'rem'}}>hey, username</p>
                <div id="bear"></div>
                <p style={{padding: 0, marginTop: 0.5 + 'rem', marginBottom: 0.5 + 'rem'}}>here is a bear!</p>
                <p style={{padding: 0, marginTop: 0.5 + 'rem', marginBottom: 0.5 + 'rem'}}>I put it here for your personal delight</p>
                <Link to="/home">
                    <button>home</button>
                </Link>
            </div>
        </main>
    );
}
