import React, {useEffect, useState} from 'react'
import {taskApi} from "../api/task-api";

export default {
    title: 'API for Tasks'
}

const todoId = 'a9359218-3cb3-4a7e-b0c4-4ef72e54e62c'

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        taskApi.getTasks(todoId)
            .then(res =>{
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {


        taskApi.createTask(todoId, 'HTML')
            .then(res =>{
                console.log(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const taskId = 'a3619f26-c568-405c-a04b-c2d18fb8bee2'

        taskApi.deleteTask(todoId, taskId)
            .then(res =>{
                console.log(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const taskId = 'a3619f26-c568-405c-a04b-c2d18fb8bee2'

        taskApi.updateTask(todoId, taskId, 'CSS')
            .then(res =>{
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
