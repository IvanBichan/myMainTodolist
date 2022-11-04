import React, {ChangeEvent, useState} from 'react';

type EditTableSpanType ={
    title:string
    editTaskHandler:(newTitle:string)=>void
}

export const EditTableSpan = (props:EditTableSpanType) => {
    const [edit,setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        setEdit(!edit)
        props.editTaskHandler(newTitle)
    }
   /* const onBlurHandler = () => {
        onDoubleClickHandler()
        props.editTaskHandler(newTitle)
    }*/

    return (
        edit
            ? <input value={newTitle} onBlur={onClickHandler} onChange={onChangeHandler} autoFocus/>
            : <span onClick={onClickHandler}> {props.title} </span>
    );
};