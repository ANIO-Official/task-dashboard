import type { Filters, TaskItemProps } from "../../types";
import { useState } from "react";
import './TaskItem.css'

export default function TaskItem({ task, onChange }: TaskItemProps) {

    //Field state variables for updating values
    const [field, setField] = useState<Filters>(
            {
                status: task.status,//defaults from the tasks object made in the TaskForm component
                priority: task.priority//defaults from the tasks object made in the TaskForm component
            }
            
        )

    //When a Select has an OnChange event...
    const handleChanges = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = event.target //Get the values of the select the event occured on  
        setField( prevData => ({
            ...prevData, //get the previous version of the state variable keyvalue pairs.
            [name]: value   //Update Select Values
        }))
        onChange(task.id, name, value) //Update Item in array
    }
    
    return (
        <div className="task-item">
            <h3 className="title">{task.title}</h3>
            <div>
                <select onChange={handleChanges} className="status-select" name="status" value={field.status}>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
                <select onChange={handleChanges} className="priority-select" name="priority" value={field.priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <p>
                <b className="date">Date</b> {task.date}
                <br/>
                <b className="memo">Memo</b> {task.memo}
            </p>
        </div>
    )
}