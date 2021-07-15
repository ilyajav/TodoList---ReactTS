import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string;
    changeTitle: (newTitle: string) => void;
}

export const EditableSpan = React.memo<EditableSpanPropsType>(({title, changeTitle}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    const activateEditMode = () => {
        setEdit(true)
        setNewTitle(title)
    }

    const activateViewMode = () => {
        setEdit(false)
        changeTitle(newTitle)

    }
    const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        <span>
                {
                    edit ?
                        <TextField variant={'outlined'} value={newTitle} onBlur={activateViewMode} autoFocus
                                   onChange={changeNewTaskTitle}/>
                        : <span onDoubleClick={activateEditMode}>{title}</span>
                }
            </span>
    )
})
