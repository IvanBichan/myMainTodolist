import React, {KeyboardEvent,ChangeEvent, useState} from "react";
import style from './Todolist.module.css'
import {FilterType} from "./App";
import {Input} from "./components/Input";


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
}
type ObjectType = {
    id:string,
    title:string,
    isDone:boolean,
}


export const Todolist = (props:TodolistPropsType) => {


    //const [newTitle, setNewTitle] = useState('')
    //const [error, setError] = useState<string|null>(null)

    /*const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }*/
    const onChangeCheckBoxHandler = (todolistID:string,taskID:string,eventValue:boolean) => {
        props.changeStatus(todolistID,taskID,eventValue)
    }
    /*const addTaskHandler = () => {
        if(newTitle.trim() !== '') {
            props.addTask(props.todolistID,newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }*/
   /* const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            addTaskHandler()
        }
    }*/
    const removeTaskHandler = (todolistID:string,taskID:string) => {
        props.removeTask(todolistID,taskID)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTaskHandler = (newTitle:string) => {
        props.addTask(props.todolistID,newTitle)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");



    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolistHandler}>x</button></h3>
            <Input callback={addTaskHandler}/>
            {/*<div>
                <input
                    className={error ? style.error : ''}
                    value={newTitle} onKeyDown={onKeyDownHandler}
                    onChange={onChangeHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={style.errorMessage}>{error}</div>}
            </div>*/}

            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id} className={el.isDone ? style.isDone : ''}>
                            <button onClick={() => removeTaskHandler(props.todolistID, el.id)}>X</button>
                            <input type="checkbox" checked={el.isDone}
                                   onChange={(e) => onChangeCheckBoxHandler(props.todolistID, el.id, e.currentTarget.checked)}
                            />
                            <span>{el.title}</span>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all'? style.activeFilter : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active'? style.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed'? style.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}