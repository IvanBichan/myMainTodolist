import React from "react";

type TodolistPropsType = {
    title:string
    tasks:Array<ObjectType>
}
type ObjectType = {
    id:number,
    title:string,
    isDone:boolean,
}

export const Todolist = (props:TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((m) => {
                    return (
                        <li key={m.id}><input type="checkbox" checked={m.isDone}/> <span>{m.title}</span></li>
                        )
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}