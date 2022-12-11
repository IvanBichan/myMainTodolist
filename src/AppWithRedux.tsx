import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodolistWithRedux from "./TodolistWithRedux";

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


function AppWithRedux() {


    const todolists = useSelector<AppRootStateType, TodolistType[]>(state=> state.todolists)
    //const tasks = useSelector<AppRootStateType, TasksStateType>(state=> state.tasks)

    const dispatch = useDispatch()


    const changeFilter = (todolistID:string, filterValue:FilterValuesType)=> {
        dispatch(changeFilterAC(todolistID,filterValue))
    }
    const removeTodolist = (todolistID:string) => {
        dispatch(removeTodolistAC(todolistID))

    }
    const changeTodolistTitle = (todolistID:string, newValue:string) => {
        dispatch(changeTodolistTitleAC(todolistID,newValue))
    }

    const addTodolist = (newTitle:string) => {
        dispatch(addTodolistAC(newTitle))
    }

    const editTask = (todolistID:string,taskID:string,newValue:string ) => {
        dispatch(changeTaskTitleAC(taskID,todolistID,newValue))
    }


    const removeTask = (todolistID:string,taskID:string) => {
        dispatch(removeTaskAC(taskID,todolistID))
    }

    const addTask = (todolistID:string,newTitle:string) => {
        dispatch(addTaskAC(newTitle,todolistID))
    }
    const changeStatus = (todolistID:string,taskID:string,newValue:boolean) => {
        dispatch(changeTaskStatusAC(taskID,newValue,todolistID))
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
                           /* let afterFilterTasks= tasks[todolist.id]
                            if (todolist.filter === 'active') {
                                afterFilterTasks=tasks[todolist.id].filter(el=>!el.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                afterFilterTasks=tasks[todolist.id].filter(el=>el.isDone)
                            }*/
                            return (
                                <Grid item key={todolist.id}>
                                    <Paper style={{padding:"10px"}}>
                                        {/*<Todolist
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
                                        />*/}
                                        <TodolistWithRedux
                                            todolist={todolist}
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

export default AppWithRedux;
