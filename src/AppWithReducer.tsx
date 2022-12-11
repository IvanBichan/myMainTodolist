import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, GeneralType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    GeneralTaskType,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

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


function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[],GeneralType>>(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, GeneralTaskType>>(tasksReducer,{
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
        dispatchToTodolists(changeFilterAC(todolistID,filterValue))
    }
    const removeTodolist = (todolistID:string) => {
        let action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistID:string, newValue:string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistID,newValue))
    }

    const addTodolist = (newTitle:string) => {
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const editTask = (todolistID:string,taskID:string,newValue:string ) => {
        dispatchToTasks(changeTaskTitleAC(taskID,todolistID,newValue))
    }


    const removeTask = (todolistID:string,taskID:string) => {
        let action = removeTaskAC(taskID,todolistID);
        dispatchToTasks(action)
    }

    const addTask = (todolistID:string,newTitle:string) => {
        dispatchToTasks(addTaskAC(newTitle,todolistID))
    }
    const changeStatus = (todolistID:string,taskID:string,newValue:boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskID,newValue,todolistID))
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

export default AppWithReducer;
