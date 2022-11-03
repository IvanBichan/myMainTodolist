import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";



function App() {
    const title1 = 'What to learn -1';
    //const title2 = 'What to learn -2';

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Angular", isDone: false}
    ])

    /*const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]*/
    const removeTask = (taskID:string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }
    const addTask = (newTitle:string) => {
        setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks, ])
    }


   /*

    let [filter,setFilter]=useState<FilterType>('All')
    let afterFilterTasks= tasks
    if (filter === 'Active') {
        afterFilterTasks=tasks.filter(el=>!el.isDone)
    }
    if (filter === 'Completed') {
        afterFilterTasks=tasks.filter(el=>el.isDone)
    }

    const filteredTask = (filterValue:FilterType)=> {
        setFilter(filterValue)
    }*/



    return (
        <div className="App">
            <Todolist
                title={title1}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                /*filteredTask={filteredTask}*/
            />
           {/* <Todolist title={title2} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
