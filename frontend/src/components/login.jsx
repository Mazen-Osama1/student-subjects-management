import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
export default function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [status,setStatus] = useState("");
    const [message,setMessage] = useState("");
    const [ch,setch] = useState("");
    const navigate = useNavigate();

    const login = () => {
        fetch('http://127.0.0.1:8000/login/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username:username,
                password:password,
            }),
        }).then(res => {setStatus(res.status); setMessage(res.message);return res.json()})
        .then(
            data => {
                if (data.access){
                    localStorage.setItem("access",data.access);
                    localStorage.setItem("refresh",data.refresh);
                    navigate("/subjects");
                }
                else{
                    setch("Error");setMessage(data.message);
                }
            }
        );
    }

    return(
        <div className="container">
            <div className="card">
                <h2>Login</h2>
                <hr />
                <input value={username} onChange={e => {setUsername(e.target.value)}} placeholder="Enter Username"/>
                <input type="password" value={password} onChange={(e => setPassword(e.target.value))} placeholder="Enter Password"/>
                <button className="register_btn" onClick={login}>Login</button>
                <div className="s">
                    <p>Status: {status}</p><span>{ch}: {message}</span>
                </div>
                <p className="p"> Don't have an account? <Link to={"/register"}><span>Register</span></Link></p>
            </div>
        </div>
    )
}