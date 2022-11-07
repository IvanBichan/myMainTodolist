import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state:Array<TodolistType>,action:GeneralType) => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            return state.map(el => el.id===action.payload.todolistID ? {...el, filter:action.payload.filterValue} :el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id )
        }
        case "ADD-TODOLIST": {
            const  newTodolistID = v1()
            const newTodolist:TodolistType = {id: newTodolistID, title: action.payload.title, filter: 'all'}
            return [...state,newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el=>el.id===action.payload.todolistID? {...el,title:action.payload.newValue} : el)
        }
        default: return state

    }
}

type GeneralType = changeFilterACType | removeTodolistACType | addTodolistACACType | changeTodolistTitleACType;

type changeFilterACType = ReturnType<typeof changeFilterAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeFilterAC = (todolistID:string, filterValue:FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload:{
            todolistID,
            filterValue,
        }
    } as const
}
export const removeTodolistAC = (todolistID:string) => {
    return{
        type: "REMOVE-TODOLIST",
        payload: {
            id: todolistID
        }
    } as const
}
export const addTodolistAC = (newTitle:string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title:newTitle
        }
    } as const
}
export const changeTodolistTitleAC = (todolistID:string, newValue:string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistID,
            newValue
        }
    }  as const
}