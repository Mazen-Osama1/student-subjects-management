import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
export default function Register(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [status,setStatus] = useState("");
    const [message,setMessage] = useState("");
    const [ch,setch] = useState("");
    const navigate = useNavigate();
    const register = () => {
        fetch('http://127.0.0.1:8000/register/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:username,
                password:password,
            }),
        }).then(res => {setStatus(res.status);if (res.ok) {navigate("/login")}else{setch("Error")} return res.json()})
        .then(data => {setMessage(data.message)});

    }
 
    return(
        <div className="container">
            <div className="card">
                <h2>Create Acount</h2>
                <hr />
                <input value={username} onChange={e => {setUsername(e.target.value)}} placeholder="Enter Username"/>
                <input type="password" value={password} onChange={(e => setPassword(e.target.value))} placeholder="Enter Password"/>
                <button className="register_btn" onClick={register}>Register</button>
                <div className="s">
                    <p>Status: {status}</p><span>{ch}: {message}</span>
                </div>
                <p className="p"> Do you have account? <Link to={"/login"}><span>Login</span></Link></p>
            </div>
        </div>
    )
}