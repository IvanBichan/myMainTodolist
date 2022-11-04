import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id:string
    title:string
    filter:FilterType
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistID:string,taskID:string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id !== taskID)})
    }
    const addTask = (todolistID:string,newTitle:string) => {
        setTasks({...tasks,[todolistID]:[{id: v1(), title: newTitle, isDone: false},...tasks[todolistID]]})
    }
    const changeStatus = (todolistID:string,taskID:string,newValue:boolean) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id === taskID ? {...el,isDone:newValue} : el)})

    }
    const changeFilter = (todolistID:string, filterValue:FilterType)=> {
        setTodolists(todolists.map(el=> el.id === todolistID ? {...el,filter:filterValue}:el))
    }
    const removeTodolist = (todolistID:string) => {
        setTodolists(todolists.filter(el=>el.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {todolists.map((todolist) =>{
                let afterFilterTasks= tasks[todolist.id]
                if (todolist.filter === 'active') {
                    afterFilterTasks=tasks[todolist.id].filter(el=>!el.isDone)
                }
                if (todolist.filter === 'completed') {
                    afterFilterTasks=tasks[todolist.id].filter(el=>el.isDone)
                }
                return (
                    <Todolist
                        key={todolist.id}
                        todolistID={todolist.id}
                        title={todolist.title}
                        tasks={afterFilterTasks}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        changeFilter={changeFilter}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
