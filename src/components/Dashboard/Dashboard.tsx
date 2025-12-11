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

export default function Dashboard() {
    //Tasks | For Tasks[] updates ================================
    const [tasks, setTasks] = useState<TypesAndInterfaces.Task[]>([]) //Data

    const handleTaskCreation = (newValue: TypesAndInterfaces.Task) => {
        setTasks(prevTasks => [...prevTasks, newValue]) //Add to array
    }


    //Filter Setting(s) For all Tasks | For Filter Value update based on select ================================
    const [filter, setFilter] = useState<TypesAndInterfaces.Filters>(
        {
            status: '', //defaults
            priority: '' //defaults
        }
    )

    //JSX
    return (

        <div className="dashboard">
            <h2>Money on the Dash</h2>
            <p><i>Where the real cash is made</i></p>
            <div className='main-items row row-col-md-2'>
                <div className='task-form-component-container col'>
                    <TaskForm
                        onSubmit={handleTaskCreation}
                    />
                </div>
                <div className='task-list-component-container col'>
                    <TaskList
                        tasks={tasks}
                    />
                </div>
            </div>

        </div>


    )
}