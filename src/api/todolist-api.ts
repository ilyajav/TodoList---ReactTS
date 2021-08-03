import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '894be655-7668-4c64-ab04-a70e23a3a596'
    }

})

export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}


export const todolistApi = {
       getTodos(){
           return instance.get<Array<TodoListsType>>('todo-lists')
       },
       createTodo(title: string){
           return instance.post<CommonResponseType<TodoListsType>>('todo-lists', {
               title,
           })
       },
      updateTodoTitle(todoID: string, title: string){
         return instance.put<CommonResponseType>(`todo-lists/${todoID}`, {
             title,
         })
      },
      deleteTodo(todoID: string){
          return instance.delete<CommonResponseType>(`todo-lists/${todoID}`)
      }
}
