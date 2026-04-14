import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const [userInfo, setUserInfo] = React.useState('');
    const navigate = useNavigate();

    // this isn't getting hit?? so make sure to look at that when you start again
    React.useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        const res = await fetch('/api/auth/me', {
                method: "GET",
            });
        const data = await res.json();
        setUserInfo(data.username);
    }

    function handleLogout() {
        fetch('/api/auth', {
            method: 'DELETE',
        });
        props.onLogout();
        localStorage.removeItem('username');
    }

    return (
        <div className="test">
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>hey, {userInfo} :)</p>
            <div>
                <button style={{marginRight: 0.5 + "rem"}} onClick={() => navigate('/home')}>home</button>
                <button style={{marginLeft: 0.5 + "rem"}} onClick={() => handleLogout()}>logout</button>
            </div>
        </div>
    )
}