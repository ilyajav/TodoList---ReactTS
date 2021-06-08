import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type AddItemsPropsType = {
    addItem: (title: string) => void
}

export const AddItems: FC<AddItemsPropsType> = ({addItem}) =>{
    const [newTitleTask, setNewTitleTask] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    debugger
    const onButtonClick = () => {
        debugger
        if (newTitleTask.trim() !== '') {
            debugger
            addItem(newTitleTask.trim());
            debugger
            setNewTitleTask('');
        } else {
            debugger
            setError(true)
        }
    }

    const onEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onButtonClick()
        }
    }

    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleTask(e.currentTarget.value)
        setError(false)
    }

    return(
        <div>
            <input value={newTitleTask} onChange={onTaskTitleChange}
                   onKeyPress={onEnterClick} className={error ? 'error' : ''}/>
            <button onClick={onButtonClick}>+</button>
            {error && <div className={'error-text'}>Field is required</div>}
        </div>
    )
}