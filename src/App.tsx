import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";



function App() {
    const title1 = 'What to learn -1';
    //const title2 = 'What to learn -2';

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Angular", isDone: false}
    ])

    /*const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]*/
    const removeTask = (taskID:number) => {
        setTasks(tasks.filter(el => el.id !== taskID))
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
                /*filteredTask={filteredTask}*/
            />
           {/* <Todolist title={title2} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
