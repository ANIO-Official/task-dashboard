/* Types */
export type Status = 'incomplete' | 'complete' | ''
export type Priority = 'low' | 'medium' | 'high' | ''

/* Object Shapes | Interfaces */

export interface Task{
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
}

export interface TaskListProps{
    tasks: Task[]
}

export interface TaskFilterProps{

}
export interface Filters{
    status?: Status 
    priority?: Priority
}