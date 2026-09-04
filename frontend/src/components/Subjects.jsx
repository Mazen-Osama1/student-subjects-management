import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";
import { fetchWithAuth } from "./auth";

function SubjectCard({id,name,countTasks,deleteSub,openTasks}){
    return(
        <div className="sub-card">
            <div className="info">
                <h2>{name}</h2>
                <p>Tasks: {countTasks}</p>
            </div>
            <div className="btnsub">
                <button className="opent" onClick={openTasks}>Open Tasks</button>
                <button className="delete" onClick={deleteSub}>Delete</button>
            </div>
        </div>
    )
}

export default function Subjects(){
    const [subjects,setSubjects] = useState([]);
    const [name,setname] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("access");

    const deleteSub = (id) => {
        fetchWithAuth(`http://127.0.0.1:8000/subject/${id}/`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(() => setSubjects(prev => prev.filter(sub => sub.id !== id)));
    }

    const openTasks = (id) => {
        navigate(`/subjects/${id}/tasks`);
    }

    useEffect(() => {
        fetchWithAuth('http://127.0.0.1:8000/subject/',{
            headers:{
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => setSubjects(data));
    },[])

    const addSubject = () => {
        fetchWithAuth('http://127.0.0.1:8000/subject/',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({name:name}),
        }).then(res => {setname("");return res.json()}).then(data => setSubjects(prev => [...prev,data]))
    }

    return(
        <div className="container">
            <h2>My Subjects</h2>
            <div className="input-div">
                <input value={name} type="text" placeholder="Subject Name" onChange={e => setname(e.target.value)}/>
                <button className="add-subject" onClick={addSubject}>Add Subject</button>
            </div>
            <div className="sub-div">
                {subjects.length > 0 ? subjects.map(sub => (<SubjectCard key={sub.id} id={sub.id} name={sub.name} countTasks={sub.task_count} deleteSub={() => deleteSub(sub.id)} openTasks={() => openTasks(sub.id)}/>)) : <h2 className="no-sub">No Subjects Yet</h2>}
            </div>
        </div>
    )
}