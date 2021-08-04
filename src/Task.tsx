import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TaskPropsType = {
    removeTasks: (selectID: string, todoListID: string) => void;
    changeStatus: (id: string, isDoneStatus: TaskStatuses, todoListID: string) => void;
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void;
    task: TaskType;
    todoListId: string;
}

export const Task =  React.memo<TaskPropsType>(({removeTasks, changeStatus, changeTaskTitle, task, todoListId}) => {

        const onRemoveTasks = () => removeTasks(task.id, todoListId)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) =>{
            const isCheck = e.currentTarget.checked
            changeStatus(task.id, isCheck ? TaskStatuses.Completed : TaskStatuses.New, todoListId)
        }
        const changeTaskName = useCallback((newTitle: string) => {
            changeTaskTitle(task.id, todoListId, newTitle)
        }, [changeTaskTitle, task.id, todoListId])

        return <div key={task.id}>
            <Checkbox checked={task.status === TaskStatuses.Completed} onChange={onChangeStatus}/>
            <EditableSpan title={task.title} changeTitle={changeTaskName}/>
            <IconButton onClick={onRemoveTasks}>
                <Delete/>
            </IconButton>
        </div>
    })
