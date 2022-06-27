import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Box, Button, FormControl, IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {RequestStatusType} from "../../app/app-reducer";

// Пробелы между импортами и удалить не нужные

type AddItemFormPropsType = {
    addItem: (title: string) => void,
    entityStatus?: RequestStatusType
}

// Вынести тип в AddItemForm.types.ts, переименовать фукнции, используя on префикс

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {
    console.log("AddItemForm called")
    // Убрать console.log

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
            // Вынести текст в контсанту
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            // Заменить charCode на e.key === 'Enter'
            addItem();
        }
    }

    // Переименовать функции в handler

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
                   disabled={props.entityStatus === 'loading'}
        />
        <IconButton color="primary" onClick={addItem} disabled={props.entityStatus === 'loading'}>
            <AddBox />
        </IconButton>
    </div>
})

// Текст в контсанты