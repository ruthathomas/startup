import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {

    const navigate = useNavigate();

    // logout function
    function logout() {
        localStorage.removeItem('username');
        props.onLogout();
    }

    return (
        <div className="test">
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>hey, {props.username} :)</p>
            <div>
                <button style={{marginRight: 0.5 + "rem"}} onClick={() => navigate('/home')}>home</button>
                <button style={{marginLeft: 0.5 + "rem"}} onClick={() => logout()}>logout</button>
            </div>
        </div>
    )
}