import { useNavigate } from "react-router-dom";

export function UndefinedValState() {
    const navigate = useNavigate();

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 style={{padding: 1 + "rem", margin: 0}}><b>😞 No game code recognized</b></h2>
            <div style={{all: 'revert', display: 'flex', alignContent: 'stretch'}}>
                <p style={{padding: 1 + "rem"}}><b>please try again</b></p>
                <button onClick={() => navigate('/home')}>home</button>
            </div>
        </div>
    )
}