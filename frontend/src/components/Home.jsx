import "./App.css"
import { useNavigate } from "react-router-dom";
export default function Home(){
    const navigate = useNavigate();
    return(
        <div className="container">
            <h1>Welcome to our App</h1>
            <div className="buttons">
                <button className="login" onClick={() => navigate("/login")}>Login</button>
                <button className="register" onClick={() => navigate("/register")}>Register</button>
            </div>
        </div>
    )
}