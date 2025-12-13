import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";
import "./TaskList.css";

export default function TaskList({ tasks, onChange, onDelete }: TaskListProps) {
  return (
    <div className="task-list-container rounded">
      <h2 className="ps-4">Current Tasks🐱‍👓</h2>
      <ul className="task-list">
        {
          //Create a <li> of a TaskItem Component for each task in tasks.
          tasks.map((task) => (
            //Key is first letter of Title + Date
            <li key={task.id}>
              <TaskItem
                task={task} //send the task from tasks state variabel array
                onChange={onChange} //send the setter function
                onDelete={onDelete}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}
