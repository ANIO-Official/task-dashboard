import type { TaskItemProps } from "../../types";

export default function TaskItem({ task }: TaskItemProps) {

    //Need a change event handler for the selects. Reminder for later :3
    
    return (
        <div>
            <h3>{task.title}</h3>
            <div>
                <select name="status" value={task.status}>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
                <select name="priority" value={task.priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <p>
                <b>Date</b> {task.date}
                <br/>
                <b>Memo</b> {task.memo}
            </p>
        </div>
    )
}