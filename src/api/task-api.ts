import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers : {
        'api-key': '894be655-7668-4c64-ab04-a70e23a3a596'
    }
})

type CommonResponseType<T = string[], D = string[], V = {}> = {
    items: {
        description: string,
        title: string,
        completed: boolean,
        status: number,
        priority: number,
        startDate: string,
        deadline: string,
        id: string,
        todoListId: string,
        order: number,
        addedDate: string,
    }
    totalCount: number,
    error: string,
    resultCode: number,
    messages: T,
    fieldsErrors: D,
    data: V,
}

export const taskApi = {
    getTasks(todolistId: string){
        return instance.get<CommonResponseType[]>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<CommonResponseType>(`/todo-lists/${todolistId}/tasks`, {
            title,
        })
    },
    updateTask(todolistId: string, taskId: string, title: string){
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
            title
        })
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
