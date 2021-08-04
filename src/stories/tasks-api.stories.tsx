import React, {useEffect, useState} from 'react'
import {TaskPriorities, TaskStatuses, todoListsAPI} from "../api/todolist-api";

export default {
    title: 'API for Tasks'
}

const todoId = '40dac9fa-e363-4ef8-8bd9-adff9a4a0ad8'

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todoListsAPI.getTasks(todoId)
            .then(res =>{
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {


        todoListsAPI.createTask(todoId, 'TDD')
            .then(res =>{
                console.log(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const taskId = '350cdea2-74ee-4ea6-ba2c-daf0a881140a'

        todoListsAPI.deleteTask(todoId, taskId)
            .then(res =>{
                console.log(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const taskId = 'a285ebcc-11b3-4c51-907b-6d4eef804e19'

        todoListsAPI.updateTask(todoId, taskId, {
            title: 'Cheese',
            deadline: '',
            description: '',
            startDate: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
        })
            .then(res =>{
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
