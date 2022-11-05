import React  from "react";
import style from './Todolist.module.css'
import {FilterType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditTableSpan} from "./components/EditTableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


type TodolistPropsType = {
    todolistID:string
    title:string
    tasks:Array<ObjectType>
    removeTask:(todolistID:string,taskID:string)=>void
    addTask:(todolistID:string,newTitle:string)=>void
    changeStatus:(todolistID:string,tID:string,newValue:boolean)=>void
    changeFilter:(todolistID:string, filterValue:FilterType)=>void
    filter:FilterType
    removeTodolist:(todolistID:string)=>void
    editTask:(todolistID:string,taskID:string,newValue:string)=>void
    editTodolist:(todolistID:string, newValue:string)=>void
}
type ObjectType = {
    id:string,
    title:string,
    isDone:boolean,
}


export const Todolist = (props:TodolistPropsType) => {

    const onChangeCheckBoxHandler = (todolistID:string,taskID:string,eventValue:boolean) => {
        props.changeStatus(todolistID,taskID,eventValue)
    }
    const removeTaskHandler = (todolistID:string,taskID:string) => {
        props.removeTask(todolistID,taskID)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTaskHandler = (newTitle:string) => {
        props.addTask(props.todolistID,newTitle)
    }
    const editTodolistHandler = (newValue:string) => {
        props.editTodolist(props.todolistID,newValue)
    }
    const editTaskHandler = (taskID:string,newValue:string) => {
        props.editTask(props.todolistID,taskID,newValue)
    }


    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");



    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} callback={editTodolistHandler}/>
                {/*<button onClick={removeTodolistHandler}>x</button>*/}
                <IconButton aria-label="delete" onClick={removeTodolistHandler} >
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id} className={t.isDone ? style.isDone : ''} >
                            {/*<button onClick={() => removeTaskHandler(props.todolistID, t.id)}>X</button>*/}
                            {/*<input type="checkbox" checked={t.isDone}
                                   onChange={(e) => onChangeCheckBoxHandler(props.todolistID, t.id, e.currentTarget.checked)}
                            />*/}
                            <Checkbox
                                checked={t.isDone}
                                onChange={(e) => onChangeCheckBoxHandler(props.todolistID, t.id, e.currentTarget.checked)}
                            />

                            {/*<span>{el.title}</span>*/}
                            <EditTableSpan callback={(newTitle)=>editTaskHandler(t.id,newTitle)} title={t.title}/>
                            <IconButton aria-label="delete" onClick={() => removeTaskHandler(props.todolistID, t.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all'? 'outlined' : 'text'} color="inherit"   onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active'? 'outlined' : 'text'} color="primary" style={{}} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed'? 'outlined' : 'text'} color="secondary"  style={{}} onClick={onCompletedClickHandler}>Completed</Button>
                {/*<button className={props.filter === 'all'? style.activeFilter : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active'? style.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed'? style.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>*/}
            </div>
        </div>
    )
}