import React, {useState} from "react";


type TodolistPropsType = {
    title:string
    tasks:Array<ObjectType>
    removeTask:(taskID:number)=>void
    /*filteredTask:(filterValue:FilterType)=>void*/
}
type ObjectType = {
    id:number,
    title:string,
    isDone:boolean,
}
export type FilterType = 'All' | 'Active' | 'Completed'

export const Todolist = (props:TodolistPropsType) => {



    let [filter,setFilter]=useState<FilterType>('All')
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


    const deleteTask = (taskID:number) => {
        props.removeTask(taskID)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {afterFilterTasks.map(el =>
                    <li key={el.id}>
                        <button onClick={()=>deleteTask(el.id)}>X</button>
                        <input type="checkbox" defaultChecked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>)}
            </ul>
            <div>
                <button onClick={()=>filteredTask('All')}>All</button>
                <button onClick={()=>filteredTask('Active')}>Active</button>
                <button onClick={()=>filteredTask('Completed')}>Completed</button>
            </div>
        </div>
    )
}