/* Types */
type Status = 'incomplete' | 'complete'
type Priority = 'low' | 'medium' | 'high'

/* Object Shapes | Interfaces */

export interface Task{
    title: string,
    date: Date,
    memo: string,
    status:Status,
    priority: Priority
}
