import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todoListsAPI.getTodoLists()
            .then((res) =>{
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodolist('AXIOS10')
            .then(res => {
                console.log(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId =  'dac16a73-1524-41f1-823a-13587894c077'

        todoListsAPI.deleteTodolist(todolistId)
            .then(res =>{
                console.log(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
           const todoID = 'feb3c2ae-54a6-479d-a666-fe00b5b5d80a'
        todoListsAPI.updateTodolist(todoID,'What to learn')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
