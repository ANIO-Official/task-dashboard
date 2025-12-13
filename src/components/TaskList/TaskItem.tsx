import type { Filters, Task, TaskItemProps } from "../../types";
import { useState } from "react";
import './TaskItem.css'

export default function TaskItem({ task, onChange }: TaskItemProps) {

    //Field state variables for updating values
    const [field, setField] = useState<Task>(
            {
                id: task.id, //CAUTION: DO NOT USE SETFIELD ON THIS. Must stay the same for React state changes.
                title:task.title, //defaults
                date: task.date, //defaults
                memo: task.memo, //defaults
                status: task.status,//defaults from the tasks object made in the TaskForm component
                priority: task.priority//defaults from the tasks object made in the TaskForm component
            }
            
        )

    //When a Select has an OnChange event...
    const handleChanges = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target //Get the values of the select the event occured on  
        

        setField( prevData => ({
            ...prevData, //get the previous version of the state variable keyvalue pairs.
            [name]: value   //Update Select Values
        }))
        onChange(task.id, name, value) //Update Item in array
    }
    
    return (
        <div className="task-item">
            <input onChange={handleChanges} name="title" type="text" className="task-title my-2" value={field.title}/>
            <div>
                <select onChange={handleChanges} className="status-select my-2" name="status" value={field.status}>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
                <select onChange={handleChanges} className="priority-select my-2" name="priority" value={field.priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <input onChange={handleChanges} name="date" type='datetime-local' className="date my-2" value={field.date}/>
                <br/>
                <textarea onChange={handleChanges} name="memo" className="memo" value={field.memo}/> 
            </div>
        </div>
    )
}