/* Types */
export type Status = 'incomplete' | 'complete' | ''
export type Priority = 'low' | 'medium' | 'high' | ''

/* Object Shapes | Interfaces */

export interface Task{
    title: string,
    date: Date,
    memo: string,
    status:Status,
    priority: Priority
}

export interface TaskFormProps{
    
}

export interface TaskListProps{

}

export interface TaskFilterProps{

}
export interface Filters{
    status?: Status 
    priority?: Priority
}