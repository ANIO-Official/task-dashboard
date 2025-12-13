/* Types */
export type Status = "incomplete" | "complete" | "";
export type Priority = "low" | "medium" | "high" | "";
export type Alphabetical = "a-z" | "z-a";

/* Object Shapes | Interfaces */

export interface Task {
  id: string;
  title: string;
  date: number;
  memo: string;
  status: Status;
  priority: Priority;
}

export interface TaskFormProps {
  onSubmit: (newTask: Task) => void; //Recieve from parent --> Use to send to array.
  updateFilteredDefault: (newTask: Task) => void;
}

export interface TaskItemProps {
  task: Task;
  onChange: (taskID: string, name: string, value: string) => void; //Add change event to selects for all items
  onDelete: (taskID:string) => void //Delete task, send ID to parent 
}

export interface TaskListProps {
  tasks: Task[];
  onChange: (taskID: string, name: string, value: string) => void; //let parent update tasks values
  onDelete: (taskID:string) => void //Delete task, send ID to parent
}

export interface TaskFilterProps {
  onFilter: (value: string, filterType: string) => void; //send back filter value to set state
  onSort: (sortedTasks: Task[]) => void;
  tasks: Task[];
}
export interface Filters {
  status?: Status;
  priority?: Priority;
  alphabetical?: Alphabetical;
}
