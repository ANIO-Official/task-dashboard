/*
    Holds
    - task useState, setterFunct: tasks


    Sends (Props)
    - TaskForm Component | 
        tasks state variable (holds tasks array), & setTasks() for sending initial array in callback pattern
        status & priority state variables (onChange values), and setters for sending initial values in callback pattern.
    - TaskList Component | tasks state variable (holds tasks array) to make the <li>
    - TaskFilter Component | tasks state variable (holds tasks array), & setTasks() for sending filtered version in callback pattern


    Recieves (Callback Patter from children | Handler Functions)
    - TaskForm Component | new task Obj value for use in the setTask function.
    - TaskFilter Component | new filtered task Obj for use in the setTask function

    Displays
    - Tasks Statistics | # of: Low/Medium/High Priority OR Started/Pending/Completed tasks.
    - TaskList Component | <ul>
    - Filters Component | <select> and text input
*/

import * as TypesAndInterfaces from '../../types/index'
import { useState } from "react"
import TaskForm from '../TaskForm/TaskForm'
import TaskList from '../TaskList/TaskList'
import TaskFilter from '../TaskFilter/TaskFilter'
import type { Task } from '../../types/index'

export default function Dashboard() {

    //Local StorageVariables For use on Load
    const stringTaskData = localStorage.getItem('taskData') //Get local storage array
    const parsedTaskData = stringTaskData && JSON.parse(stringTaskData) //if Task data exist, parse it.

    //Tasks | For Tasks[] updates ================================
    const [tasks, setTasks] = useState<TypesAndInterfaces.Task[]>(parsedTaskData) //Data
    localStorage.setItem('taskData', JSON.stringify(tasks)) //Give key and stringify data

    //Filter & Filtered Tasks | For Tasks[] that is filtered ======================================
    const [filter, setFilter] = useState('') //initial value, will match the local storage.
    const [filteredTasks, setFilteredTasks] = useState<TypesAndInterfaces.Task[]>([...tasks])

    //Update tasks state -> Add new tasks to array
    const handleTaskCreation = (newValue: TypesAndInterfaces.Task) => {
        setTasks(prevTasks => [...prevTasks, newValue]) //Add to array
    }
    //Update Task Values
    const handleTaskChanges = (taskID: string, fieldName: string, fieldValue: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskID ? { ...task, [fieldName]: fieldValue } : task
            )
        )
    }
    /* FILTER & SORT FUNCTIONS================================= */
    const handleFilterDefault = (newTask: Task) => {
        setFilteredTasks(prevTasks => [...prevTasks, newTask])
    }

    const handleFiltering = (filterValue: string, filterType:String) => {
        setFilter(filterValue)       
        //Show Combos
        filterValue && setFilteredTasks(tasks.filter(task => task.status && task.priority === filterValue))

        //Show Status
        filterValue  && setFilteredTasks(tasks.filter(task => filterType === 'status'? task.status === filterValue : filterType === 'priority'? task.priority === filterValue : false))

        //Show Priority
     //   filterValue  && setFilteredTasks(tasks.filter(task => task.priority === filterValue))

        //Show all
        filterValue === '' && setFilteredTasks(tasks)

        // if (filterValue === 'incomplete' || 'complete') {
        //     setFilteredTasks(
        //         tasks.filter(task => task.status === filterValue)
        //     )
        // }
        // if (filterValue === 'low' || 'medium' || 'high') {
        //     setFilteredTasks(
        //         tasks.filter(task => task.priority === filterValue)
        //     )
        // }
        
    }


    const handleSorting = (sortedTasks: Task[]) => {
        setFilteredTasks(sortedTasks)
    }

    /* FILTER & SORT FUNCTIONS END================================= */

    /* LOCAL STORAGE FUNCTIONS================================= */

    //Check if there is task data in local storage and if the window is defined/exit
    function getTasks() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem('taskData')) {
                return true
            }
        }
        return false
    }

    function parseTaskData() {
        try {
            setTasks(prevTasks => [...prevTasks, parsedTaskData]) //set tasks objects to the stored data from local storage
        }
        catch (error) {
            console.error('Error parsing task data from local storage: ', error) //Note to self:Make custom errors
            setTasks([]) // Return tasks as empty on error
        }
        finally { console.log('Attempt Complete: Fetching data from local storage.') }
    }

    /* LOCAL STORAGE FUNCTIONS END================================= */

    //JSX
    return (

        <div className="dashboard" >
            <h2>Money on the Dash</h2>
            <p><i>Where the real cash is made</i></p>
            <div className='main-items row row-col-md-2'>
                <div className='task-filter-component-container'>
                    <TaskFilter
                        onFilter={handleFiltering}
                        onSort={handleSorting}
                        tasks={filteredTasks}
                    />
                </div>
                <div className='task-form-component-container col'>
                    <TaskForm
                        onSubmit={handleTaskCreation}
                        updateFilteredDefault={handleFilterDefault}
                    />
                </div>
                <div className='task-list-component-container col'>
                    <TaskList
                        tasks={filteredTasks}
                        onChange={handleTaskChanges}
                    />
                </div>
            </div>

        </div>


    )
}