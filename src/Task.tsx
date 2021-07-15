import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

type TaskPropsType = {
    removeTasks: (selectID: string, todoListID: string) => void;
    changeStatus: (id: string, isDoneStatus: boolean, todoListID: string) => void;
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void;
    task: TaskType;
    todoListId: string;
}

export const Task =  React.memo<TaskPropsType>(({removeTasks, changeStatus, changeTaskTitle, task, todoListId}) => {

        const onRemoveTasks = () => removeTasks(task.id, todoListId)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, e.currentTarget.checked, todoListId)
        const changeTaskName = useCallback((newTitle: string) => {
            changeTaskTitle(task.id, todoListId, newTitle)
        }, [changeTaskTitle, task.id, todoListId])

        return <div key={task.id}>
            <Checkbox checked={task.isDone} onChange={onChangeStatus}/>
            <EditableSpan title={task.title} changeTitle={changeTaskName}/>
            <IconButton onClick={onRemoveTasks}>
                <Delete/>
            </IconButton>
        </div>
    })
