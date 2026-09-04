import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/Home";
import Subjects from "./components/Subjects";
import Tasks from "./components/Tasks";
import { Route, Routes } from "react-router-dom";
export default function App(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/subjects" element={<Subjects/>} />
                <Route path="/subjects/:subjectId/tasks" element={<Tasks/>}/>
            </Routes>
        </div>  
    )
}