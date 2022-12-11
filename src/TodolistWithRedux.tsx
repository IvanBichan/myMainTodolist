import React, {FC} from 'react';
import {TasksStateType, TaskType, TodolistType} from "./App";
import {EditTableSpan} from "./components/EditTableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {AddItemForm} from "./components/AddItemForm";
import style from "./Todolist.module.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TodolistWithReduxType = {
    todolist: TodolistType,

}

export const TodolistWithRedux: FC<TodolistWithReduxType> = ({todolist}) => {
    const {id,title,filter} = todolist
    let tasks = useSelector<AppRootStateType,Array<TaskType> >(state=>state.tasks[id])

    const dispatch = useDispatch()

    const onChangeCheckBoxHandler = (todolistID:string,taskID:string,eventValue:boolean) => {
        //props.changeStatus(todolistID,taskID,eventValue)
        dispatch(changeTaskStatusAC(taskID,eventValue,todolistID))
    }
    const removeTaskHandler = (todolistID:string,taskID:string) => {
        //props.removeTask(todolistID,taskID)
        dispatch(removeTaskAC(taskID,todolistID))
    }
    const removeTodolistHandler = () => {
        //props.removeTodolist(props.todolistID)
        dispatch(removeTodolistAC(id))
    }
    const addTaskHandler = (newTitle:string) => {
        //props.addTask(props.todolistID,newTitle)
        dispatch(addTaskAC(newTitle,id))

    }
    const editTodolistHandler = (newValue:string) => {
        //props.editTodolist(props.todolistID,newValue)
        dispatch(changeTodolistTitleAC(id,newValue))
    }
    const editTaskHandler = (taskID:string,newValue:string) => {
        //props.editTask(props.todolistID,taskID,newValue)
        dispatch(changeTaskTitleAC(taskID,id,newValue))
    }


    const onAllClickHandler = () => dispatch(changeFilterAC(id,"all"));
    const onActiveClickHandler = () => dispatch(changeFilterAC(id,"active"));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(id,"completed"));
    if (filter === 'active') {
        tasks=tasks.filter(el=>!el.isDone)
    }
    if (filter === 'completed') {
        tasks=tasks.filter(el=>el.isDone)
    }



    return (
        <div>
            <h3>
                <EditTableSpan title={title} callback={editTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} >
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {tasks.map(t => {
                    return (
                        <li key={t.id} className={t.isDone ? style.isDone : ''} >
                            <Checkbox
                                checked={t.isDone}
                                onChange={(e) => onChangeCheckBoxHandler(id, t.id, e.currentTarget.checked)}
                            />
                            <EditTableSpan callback={(newTitle)=>editTaskHandler(t.id,newTitle)} title={t.title}/>
                            <IconButton aria-label="delete" onClick={() => removeTaskHandler(id, t.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <Button variant={filter === 'all'? 'outlined' : 'text'} color="inherit"   onClick={onAllClickHandler}>All</Button>
                <Button variant={filter === 'active'? 'outlined' : 'text'} color="primary" style={{}} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={filter === 'completed'? 'outlined' : 'text'} color="secondary"  style={{}} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
};

export default TodolistWithRedux;