import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const [userInfo, setUserInfo] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            const res = await fetch('api/user/me');
            const data = await res.json();
            setUserInfo(data);
        })();
    }, []);

    function handleLogout() {
        fetch('api/auth', {
            method: 'DELETE',
        });
        props.onLogout();
    }

    // logout function
    // function logout() {
    //     localStorage.removeItem('username');
    //     props.onLogout();
    // }

    return (
        <div className="test">
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>hey, {props.username} :)</p>
            <div>
                <button style={{marginRight: 0.5 + "rem"}} onClick={() => navigate('/home')}>home</button>
                <button style={{marginLeft: 0.5 + "rem"}} onClick={() => handleLogout()}>logout</button>
            </div>
        </div>
    )
}