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
import './Dashboard.css'

export default function Dashboard() {

    //Local StorageVariables For use on Load
    const stringTaskData = getTasks()? localStorage.getItem('taskData') : '[]' //Check for window & Get local storage array. Return empty array when no data.
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

    const handleFiltering = (filterValue: string, filterType: String) => {
        setFilter(filterValue)
        //Show Combos
        filterValue && setFilteredTasks(tasks.filter(task => task.status && task.priority === filterValue))

        //Show Status or Priority
        filterValue && setFilteredTasks(tasks.filter(task => filterType === 'status' ? task.status === filterValue : filterType === 'priority' ? task.priority === filterValue : false))

        //Show all
        filterValue === '' && setFilteredTasks(tasks)

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

    /* LOCAL STORAGE FUNCTIONS END================================= */

    //JSX
    return (

        <div className="dashboard" >
            <h2>🐾Dash Cat🐾</h2>
            <p><i>Tasks with Cats</i></p>
            <div className='task-statistics'>
                <h3>How's your progress? 🐱‍🐉</h3>
                <div className='stats d-flex flex-row justify-content-evenly'>
                    <p className='incomplete-tasks-stat'>{tasks.filter((task) => task.status === 'incomplete').length} Pending Tasks</p>
                    <p className='complete-tasks-stat'>{tasks.filter((task) => task.status === 'complete').length} Completed Tasks</p>
                    <p className='all-tasks-stat'>{tasks.length} Tasks Total</p>
                </div>
            </div>
            <div className='main-items'>
                <div className='task-filter-component-container'>
                    <TaskFilter
                        onFilter={handleFiltering}
                        onSort={handleSorting}
                        tasks={filteredTasks}
                    />
                </div>
                <div className='task-form-and-list-container d-md-flex flex-md-row border rounded bg-primary-subtle'>
                    <div className='task-form-component-container'>
                        <TaskForm
                            onSubmit={handleTaskCreation}
                            updateFilteredDefault={handleFilterDefault}
                        />
                    </div>
                    <div className='task-list-component-container'>
                        <TaskList
                            tasks={filteredTasks}
                            onChange={handleTaskChanges}
                        />
                    </div>
                </div>

            </div>

        </div>


    )
}