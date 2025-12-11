/*
    Holds
    - task useState, setterFunct: tasks


    Sends (Props)
    - TaskForm Component | tasks state variable (holds tasks array), & setTasks() for sending initial array in callback pattern
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

export default function Dashboard(){

    const [task, setTask] = useState <TypesAndInterfaces.Task[]>([])
   
    return(
        <div className="dashboard">
            <h2>Money on the Dash</h2>
            <p><i>Where the real cash is made</i></p>
        </div>
        
    )
}