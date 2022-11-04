import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "../Todolist.module.css";

type InputType = {
   callback:(title:string)=>void
}

export const Input = (props:InputType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string|null>(null)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if(newTitle.trim() !== '') {
            props.callback(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input
                className={error ? style.error : ''}
                value={newTitle}
                onKeyDown={onKeyDownHandler}
                onChange={onChangeHandler}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    );
};

