import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "../Todolist.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type InputType = {
   callback:(title:string)=>void
}

export const AddItemForm = (props:InputType) => {

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
            <TextField id="outlined-basic" label={error? "Title is required" : "Enter text "} variant="outlined" size="small"
                       className={error ? style.error : ''}
                       value={newTitle}
                       onKeyDown={onKeyDownHandler}
                       onChange={onChangeHandler}
                       error={!!error}
            />
            <Button variant="contained" color='primary' style={{maxWidth:'39px', maxHeight:'39px',minWidth:'39px', minHeight:'39px'}} onClick={addTaskHandler} >+</Button>

        </div>
    );
};

