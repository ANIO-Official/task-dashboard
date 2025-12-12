/* Types */
export type Status = 'incomplete' | 'complete' | ''
export type Priority = 'low' | 'medium' | 'high' | ''

/* Object Shapes | Interfaces */

export interface Task{
    id: string,
    title: string,
    date: number,
    memo: string,
    status:Status,
    priority: Priority
}

export interface TaskFormProps{
    onSubmit: (newTask:Task) => void //Recieve from parent --> Use to send to array.
}

export interface TaskItemProps{
    task: Task;
    onChange: (taskID:string, name: string, value: string) => void //Add change event to selects for all items
}

export interface TaskListProps{
    tasks: Task[]
    onChange: (taskID:string, name: string, value: string) => void //let parent update tasks values
}

export interface TaskFilterProps{

}
export interface Filters{
    status?: Status 
    priority?: Priority
}