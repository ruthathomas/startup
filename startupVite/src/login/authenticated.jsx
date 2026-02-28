export function Authenticated(props) {

    // logout function
    function logout() {
        localStorage.removeItem('username');
        props.onLogout();
    }

    return (
        <div>
            <p style={{textAlign: 'center'}}>hey, {props.username} :)</p>
            <button onClick={() => logout()}>logout</button>
        </div>
    )
}