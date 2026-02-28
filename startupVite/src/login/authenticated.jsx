export function Authenticated(props) {

    // logout function
    function logout() {
        localStorage.removeItem('username');
        props.onLogout();
    }

    return (
        <div>
            <p>{props.username}</p>
            <button onClick={() => logout()}>logout</button>
        </div>
    )
}