import React, {ChangeEvent, useState} from 'react';

type EditTableSpanType ={
    title:string
    callback:(newTitle:string)=>void
}

export const EditTableSpan = (props:EditTableSpanType) => {
    const [edit,setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        setEdit(!edit)
        props.callback(newTitle)
    }

    return (
        edit
            ? <input value={newTitle} onBlur={onClickHandler} onChange={onChangeHandler} autoFocus/>
            : <span onClick={onClickHandler}> {props.title} </span>
    );
};