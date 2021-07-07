import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemsPropsType = {
    addItem: (title: string) => void
}

export const AddItems: FC<AddItemsPropsType> = ({addItem}) => {
    const [newTitleItem, setNewTitleItem] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onButtonClick = () => {
        if (newTitleItem.trim() !== '') {
            addItem(newTitleItem.trim());
            setNewTitleItem('');
        } else {
            setError('Title is required')
        }
    }

    const onEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onButtonClick()
        }
    }

    const onTodoListTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleItem(e.currentTarget.value)
        setError('')
    }

    return (
        <div>
            <TextField
                label='Type-value'
                value={newTitleItem} onChange={onTodoListTitleChange}
                variant={'outlined'}
                helperText={error}
                error={!!error}
                onKeyPress={onEnterClick} className={error ? 'error' : ''}/>
            <IconButton onClick={onButtonClick} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}
