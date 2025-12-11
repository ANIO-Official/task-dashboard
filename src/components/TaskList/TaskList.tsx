import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";


export default function TaskList({tasks}:TaskListProps){
    
    return(
        <div className="task-list-container">
            <h2>Current Tasks</h2>
            <ul className="task-list">
                {
                    //Create a <li> of a TaskItem Component for each task in tasks.
                    tasks.map((task) => 
                        //Key is first letter of Title + Date
                    <li key={`${task.title.trim()[0]} + ${task.date.toString}`}>
                        <TaskItem
                            task={task}
                        />
                    </li>
                    )
                }
            </ul>
        </div>
    )
}