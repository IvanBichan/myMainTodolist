import React, {KeyboardEvent,ChangeEvent, useState} from "react";


type TodolistPropsType = {
    title:string
    tasks:Array<ObjectType>
    removeTask:(taskID:string)=>void
    addTask:(newTitle:string)=>void
    /*filteredTask:(filterValue:FilterType)=>void*/
}
type ObjectType = {
    id:string,
    title:string,
    isDone:boolean,
}
export type FilterType = 'All' | 'Active' | 'Completed'

export const Todolist = (props:TodolistPropsType) => {

    const [filter,setFilter]=useState<FilterType>('All')
    const [newTitle, setNewTitle] = useState('')

    let afterFilterTasks= props.tasks
    if (filter === 'Active') {
        afterFilterTasks=props.tasks.filter(el=>!el.isDone)
    }
    if (filter === 'Completed') {
        afterFilterTasks=props.tasks.filter(el=>el.isDone)
    }

    const filteredTask = (filterValue:FilterType)=> {
        setFilter(filterValue)
    }


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            addTaskHandler()
        }
    }

    const removeTaskHandler = (taskID:string) => {
        props.removeTask(taskID)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onKeyDown={onKeyDownHandler} onChange={onChangeHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {afterFilterTasks.map(el =>{
                    /*const deleteTaskHandler = () =>{
                        props.removeTask(el.id)
                    }*/
                    return(
                        <li key={el.id}>
                            <button onClick={()=>removeTaskHandler(el.id)}>X</button>
                            <input type="checkbox" defaultChecked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                }
                    )}
            </ul>
            <div>
                <button onClick={()=>filteredTask('All')}>All</button>
                <button onClick={()=>filteredTask('Active')}>Active</button>
                <button onClick={()=>filteredTask('Completed')}>Completed</button>
            </div>
        </div>
    )
}