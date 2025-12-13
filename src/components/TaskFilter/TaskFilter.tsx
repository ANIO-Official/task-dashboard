import type { Filters, TaskFilterProps } from "../../types";
import React, { useState } from "react";
import "./TaskFilter.css";
import * as UtilityFuncts from '../../utils/taskUtils'

export default function TaskFilter({
  onFilter,
  onSort,
  tasks,
}: TaskFilterProps) {
  //Filter Setting(s) For all Tasks | For Filter Value update based on select ================================
  const [filter, setFilter] = useState<Filters>({
    status: "", //defaults
    priority: "", //defaults
    alphabetical: "a-z",
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const { name, value } = event.currentTarget; //get target name and values
    setFilter((prevSetting) => ({
      ...prevSetting,
      [name]: value, //set new value to input
    }));
    onFilter(value, name);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newValue = event.currentTarget.value === "a-z" ? "z-a" : "a-z"; //toggle sorting style

    setFilter({ alphabetical: newValue }); //set value of sorting style for button

    if (newValue === "a-z") {
     UtilityFuncts.sortAscendingAlphabetical(tasks, onSort)
    } else if (newValue === "z-a") {
      UtilityFuncts.sortDescendingAlphabetical(tasks, onSort)
    } else {
      onSort(tasks); //show all
    }
  };

  const filterUpdateText = (
    <span
      className="task-filter-result-notification"
      style={{
        backgroundColor:
          filter.priority || filter.status ? "white" : "transparent",
      }}
    >
      {filter.status
        ? `Showing results for tasks of ${filter.status} status.`
        : filter.priority
        ? `Showing results for ${filter.priority} priority tasks.`
        : ""}
    </span>
  );

  return (
    <div className="filters">
      {(filter.status && filterUpdateText) ||
        (filter.priority && filterUpdateText)}
      <div className="filter-selects">
        <select
          onChange={handleChange}
          className="status-filter"
          name="status"
          value={filter.status}
        >
          <option value="">Choose Status</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
        <select
          onChange={handleChange}
          className="priority-filter"
          name="priority"
          value={filter.priority}
        >
          <option value="">Choose Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <br />
      <div className="filter-button">
        <button
          onClick={handleClick}
          className="alphabetical-sort-button"
          name="alphabetical"
          value={filter.alphabetical}
        >
          Sort: {filter.alphabetical === "a-z" ? "Z-A" : "A-Z"}
        </button>
      </div>
    </div>
  );
}
