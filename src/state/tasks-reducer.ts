import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: GeneralTaskType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)
            }
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID
                    ? {...el, isDone: action.payload.newValue}
                    : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID
                    ? {...el, title: action.payload.newValue}
                    : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state

    }
}

export type GeneralTaskType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType;

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskID,
            todolistID
        }
    } as const
}
export const addTaskAC = (newTitle: string, todolistID: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            newTitle,
            todolistID
        }
    } as const
}
export const changeTaskStatusAC = (taskID: string, newValue: boolean, todolistID: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskID,
            newValue,
            todolistID
        }
    } as const
}
export const changeTaskTitleAC = (taskID: string, todolistID: string, newValue: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            taskID,
            todolistID,
            newValue
        }
    } as const
}
