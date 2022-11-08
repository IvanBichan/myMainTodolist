import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id:string
    title:string
    filter:FilterValuesType
}

export type TasksStateType = {
    [key:string]: Array<TaskType>
}
export type TaskType = {
    id:string,
    title:string
    isDone:boolean
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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


    const changeFilter = (todolistID:string, filterValue:FilterValuesType)=> {
        setTodolists(todolists.map(el=> el.id === todolistID ? {...el,filter:filterValue}:el))

    }
    const removeTodolist = (todolistID:string) => {
        setTodolists(todolists.filter(el=>el.id !== todolistID))
        delete tasks[todolistID]
    }
    const changeTodolistTitle = (todolistID:string, newValue:string) => {
        console.log(todolistID)
        console.log(newValue)
        setTodolists(todolists.map( el => el.id === todolistID? {...el,title:newValue} : el ))
    }

    const addTodolist = (newTitle:string) => {
        const  newTodolistID = v1()
        const newTodolist:TodolistType = {id: newTodolistID, title: newTitle, filter: 'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({[newTodolistID]:[],...tasks})
    }

    const editTask = (todolistID:string,taskID:string,newValue:string ) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskID ?{...el,title:newValue}:el)})
    }


    const removeTask = (todolistID:string,taskID:string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id !== taskID)})
    }

    const addTask = (todolistID:string,newTitle:string) => {
        setTasks({...tasks,[todolistID]:[{id: v1(), title: newTitle, isDone: false},...tasks[todolistID]]})
    }
    const changeStatus = (todolistID:string,taskID:string,newValue:boolean) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id === taskID ? {...el,isDone:newValue} : el)})

    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:"20px 20px 20px 0"}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todolist) =>{
                            let afterFilterTasks= tasks[todolist.id]
                            if (todolist.filter === 'active') {
                                afterFilterTasks=tasks[todolist.id].filter(el=>!el.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                afterFilterTasks=tasks[todolist.id].filter(el=>el.isDone)
                            }
                            return (
                                <Grid item key={todolist.id}>
                                    <Paper style={{padding:"10px"}}>
                                        <Todolist
                                            todolistID={todolist.id}
                                            title={todolist.title}
                                            tasks={afterFilterTasks}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            changeFilter={changeFilter}
                                            filter={todolist.filter}
                                            removeTodolist={removeTodolist}
                                            editTask={editTask}
                                            editTodolist={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>



        </div>
    );
}

export default App;
