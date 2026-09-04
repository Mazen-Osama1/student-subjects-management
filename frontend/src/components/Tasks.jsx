import "./main.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./auth";

function TaskCard({id,title,deleteTask,completeTask,completed}){
    return(
        <div className={`sub-card ${completed? "completed" : ""}`}>
            <div className="infor">
                <h2 className={completed? "completed-h2" : ""}>Task</h2>
                <p className={completed? "completed-p" : ""}>{title}</p>
            </div>
            {completed? (
                <div className="completed-status">
                    <span>✓</span>
                    Completed
                </div>
                ):
                (
                    <div className="btnsub">
                        <button className="complete" onClick={completeTask}>Complete</button>
                        <button className="delete" onClick={deleteTask}>Delete</button>
                    </div>
                )
            }
        </div>
    )
}


export default function Tasks(){
    const navigate = useNavigate()
    const {subjectId} = useParams();
    const [tasks,setTasks] = useState([]);
    const token = localStorage.getItem("access");
    const [title,setTitle] = useState("");

    useEffect(() => {
        fetchWithAuth(`/tasks/?subject=${subjectId}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => setTasks(data))
    },[subjectId]);

    const addTask = () => {
        fetchWithAuth('/tasks/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            body:JSON.stringify({title:title,completed:false,subject:subjectId}),
        }).then(res => res.json()).then(data => {setTasks(prev => [...prev,data]); setTitle("")});
    }

    const completeTask = (id) => {
        fetchWithAuth(`/tasks/${id}/`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`,
            },
            body:JSON.stringify({completed:true}),
        }).then(res => res.json()).then(data => {setTasks(prev => prev.map(task => task.id === data.id ? {...task,completed: data.completed} : task))});
    }

    const deleteTask = (id) => {
        fetchWithAuth(`/tasks/${id}/`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
        }).then(res => {
            if (res.ok){
                setTasks(prev => prev.filter(task => task.id !== id))
            }
        });
    }

    const deleteAll = () => {
        fetchWithAuth("/tasks/delete_all/", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(res => {
            if (res.ok) {
                setTasks([]);
            }
        });
    }

    const Back = () => {
        navigate('/subjects');
    }

    return(
        <div className="container">
            <h2>My Tasks</h2>
            <button className="back" onClick={Back}>Back</button>
            <div className="input-div">
                <input type="text" value={title} placeholder="Task Title" onChange={e => {setTitle(e.target.value)}}/>
                <button onClick={addTask} className="add-subject">Add Task</button>
            </div>
            <div className="sub-div">
                <button className="deleteAll" onClick={deleteAll}>Delete All Tasks</button>
                {tasks.length > 0 ? tasks.map(task => (<TaskCard key={task.id} id={task.id} title={task.title} completed={task.completed} deleteTask={() => deleteTask(task.id)} completeTask={() => completeTask(task.id)}/>)) : <h2 className="no-sub">No Tasks Yet</h2>}
            </div>
        </div>
    )
}