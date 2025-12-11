import { useState } from "react"
import type { TaskFormProps, Task } from "../../types";


export default function TaskForm({ onSubmit }: TaskFormProps) {
    //Form Fields | For Value Updates based on Change events ================================
    const [field, setField] = useState<Task>(
        {
            title: '', //defaults
            date: Date.now(), //defaults
            memo: '',//defaults
            status: '', //defaults
            priority: '', //defaults
        }
    )
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target

        setField( prevData => ({
            ...prevData, //get the previous version of the state variable keyvalue pairs.
            [name]: value   //set it to the new value from the event target. 
        }))
    }

    //On Submit, make a tasks object with values from the user's input.
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        const newTask: Task = {
            title: field.title,
            date: field.date,
            memo: field.memo,
            status: field.status,
            priority: field.priority,
        }

        //Send to Submit data &  update tasks state
        const form = event.currentTarget //gets the element with the handler (<form>)
        const newTaskData = new FormData(form) //new form submission from the data submitted       
        onSubmit(newTask) //use new task in handler w/ setter funct in dashboard. Push to Array       
       
        //Alert of new task added
        alert(`Adding Task:
            ${newTask.title}
            ${newTask.date}
            ${newTask.memo}
            ${newTask.priority}
            ${newTask.status}
            `)

        //Clear fields after
        setField(
            {
            title: '', //defaults
            date: Date.now(), //defaults
            memo: '',//defaults
            status: '', //defaults
            priority: '', //defaults
        }
        )
    }


    return (
        <form className="taskForm" onSubmit={handleSubmit}>
            <div className="task-title-container">
                <label htmlFor="title">Title</label>
                <input onChange={handleInputChange} name="title" value={field.title} />
            </div>
            <div className="task-date-container">
                <label htmlFor="date">Due Date</label>
                <input onChange={handleInputChange} type="datetime-local" name="date" value={field.date} />
            </div>
            <div className="task-memo-container">
                <label htmlFor="memo">Memo</label>
                <textarea onChange={handleInputChange} name="memo" value={field.memo}/>
            </div>
            <div className="task-status-container">
                <label htmlFor="status">Status</label>
                <select onChange={handleInputChange} name="status" value={field.status}>
                    <option value=''>Choose Status</option>
                    <option value='incomplete'>Incomplete</option>
                    <option value='complete'>Complete</option>
                </select>
            </div>
            <div className="task-priority-container">
                <label htmlFor="priority">Priority</label>
                <select onChange={handleInputChange} name="priority" value={field.priority}>
                    <option value=''>Choose Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit">Add Task</button>

        </form>
    )

}