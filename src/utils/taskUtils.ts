import type { Task } from "../types";

export function checkValidationFields(currentTarget:HTMLElement){
     //Prevent form creation when invalid
        const titleInput : HTMLInputElement | null = currentTarget.querySelector('.task-title')
        const dateInput : HTMLInputElement | null = currentTarget.querySelector('.task-date')
        const memoInput : HTMLTextAreaElement | null = currentTarget.querySelector('.task-memo')
        const statusInput : HTMLSelectElement | null = currentTarget.querySelector('.task-status')
        const priorityInput : HTMLSelectElement | null = currentTarget.querySelector('.task-priority')

        /*FORM VALIDITY ON SUBMIT=========================== */
        //check for invalid areas
        switch (true){
            case titleInput && !titleInput.validity.valid:
                console.log('Cannot create Task. Check title field.')
                titleInput.focus()
                return false
            case dateInput && !dateInput.validity.valid:
                console.log('Cannot create Task. Check date field.')
                dateInput.focus()
                return false
            case memoInput && !memoInput.validity.valid:
                console.log('Cannot create Task. Check memo field.')
                memoInput.focus()
                return false
            case statusInput && !statusInput.validity.valid:
                console.log('Cannot create Task. Check status field.')
                statusInput.focus()
                return false
            case priorityInput && !priorityInput.validity.valid:
                console.log('Cannot create Task. Check priority field.')
                priorityInput.focus()
                return false
            case !titleInput || !dateInput || !memoInput || !statusInput || !priorityInput:
                console.log('Something is empty.')
                currentTarget.focus()
                return false
            default:
                return true
                
        }
}


export function filterTasksBy(filterValue:string, filterType:string, tasks: Task[], setFilteredTasks:Function){
        //Show Combos
        filterValue &&
        setFilteredTasks(
            tasks.filter((task) => task.status && task.priority === filterValue)
        );

        //Show Status or Priority
        filterValue &&
        setFilteredTasks(
            tasks.filter((task) =>
            filterType === "status"
                ? task.status === filterValue
                : filterType === "priority"
                ? task.priority === filterValue
                : false
            )
        );

        //Show all
        filterValue === "" && setFilteredTasks(tasks);
}

export function sortAscendingAlphabetical(tasks: Task[], setTasks: Function) {
  //Compare first title to next and sort in ascending alphabetical order
  const listAsc = tasks.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
  setTasks([...listAsc]);
}

export function sortDescendingAlphabetical(tasks: Task[], setTasks: Function) {
  //Compare first title to next and sort in ascending alphabetical order but then reverse it.
  const listDesc = tasks
    .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    .reverse();
  setTasks([...listDesc]);
}
