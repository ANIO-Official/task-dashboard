import { useState } from "react";
import type { TaskFormProps, Task } from "../../types";
import "./TaskForm.css";

export default function TaskForm({
  onSubmit,
  updateFilteredDefault,
}: TaskFormProps) {
  //Form Fields | For Value Updates based on Change events ================================
  const [field, setField] = useState<Task>({
    id: "", //default
    title: "", //defaults
    date: Date.now(), //defaults
    memo: "", //defaults
    status: "", //defaults
    priority: "", //defaults
  });
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setField((prevData) => ({
      ...prevData, //get the previous version of the state variable keyvalue pairs.
      [name]: value, //set it to the new value from the event target.
    }));
  };

  /*FORM VALIDITYCHECKS=========================== */

  const handleInvalidInputs = (
    event: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.currentTarget;
    const targetErrorMessager = target.nextElementSibling;

    switch (true) {
      case target.validity.valueMissing && target.name === "title":
        target.setCustomValidity("Must contain at least 1 letter.");
        break;
      case target.validity.valueMissing && target.name === "date":
        target.setCustomValidity(
          "Must be a valid date of Month/Date/Year Hours:Minutes AM/PM format."
        );
        break;
      case target.validity.valueMissing && target.name === "memo":
        target.setCustomValidity("Must contain at least 1 letter.");
        break;
      case target.validity.valueMissing && target.name === "status":
        target.setCustomValidity("Please choose a status for your task.");
        break;
      case target.validity.valueMissing && target.name === "priority":
        target.setCustomValidity("Please choose a priority for your task.");
        break;
      case target.validity.tooLong && target.name === "title":
        target.setCustomValidity("Max 25 characters.");
        break;
      default:
        target.setCustomValidity("");
    }

    targetErrorMessager
      ? (targetErrorMessager.textContent = target.validationMessage)
      : false;
  };

  //On Submit, make a tasks object with values from the user's input.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    //Create form when valid
    const makeID = `${field.title.trim()[0]}-${Date.now().toString()}`;
    const newTask: Task = {
      id: makeID,
      title: field.title,
      date: field.date,
      memo: field.memo,
      status: field.status,
      priority: field.priority,
    };

    //Send to Submit data &  update tasks state
    const form = event.currentTarget; //gets the element with the handler (<form>)
    const newTaskData = new FormData(form); //new form submission from the data submitted
    onSubmit(newTask); //use new task in handler w/ setter funct in dashboard. Push to Array
    updateFilteredDefault(newTask);

    //Alert of new task added
    alert(`Adding Task:
            ${newTask.title}
            ${newTask.date}
            ${newTask.memo}
            ${newTask.priority}
            ${newTask.status}
            `);

    //Clear fields after
    setField({
      id: "",
      title: "", //defaults
      date: Date.now(), //defaults
      memo: "", //defaults
      status: "", //defaults
      priority: "", //defaults
    });
    form.reset() //reset form
  };

  return (
    <form
      className="taskForm d-flex flex-column align-items-center rounded p-4 m-3"
      onSubmit={handleSubmit}
    >
      <h2>Add New Task 🐈</h2>
      <div className="task-title-container d-flex flex-column align-items-center">
        <label htmlFor="title">Title</label>
        <input
          maxLength={25}
          onInput={handleInvalidInputs}
          className="task-title"
          onChange={handleInputChange}
          name="title"
          value={field.title}
          required
        />
        <span className="input-error"></span>
      </div>
      <div className="task-date-container d-flex flex-column align-items-center">
        <label htmlFor="date">Due Date</label>
        <input
          onInput={handleInvalidInputs}
          className="task-date"
          onChange={handleInputChange}
          type="datetime-local"
          name="date"
          value={field.date}
          required
        />
        <span className="input-error"></span>
      </div>
      <div className="task-memo-container d-flex flex-column align-items-center">
        <label htmlFor="memo">Memo</label>
        <textarea
          maxLength={300}
          rows={7}
          onInput={handleInvalidInputs}
          className="task-memo"
          onChange={handleInputChange}
          name="memo"
          value={field.memo}
          required
        />
        <span className="input-error"></span>
      </div>
      <div className="task-status-container d-flex flex-column align-items-center">
        <label htmlFor="status">Status</label>
        <select
          onInvalid={handleInvalidInputs}
          onChange={handleInputChange}
          name="status"
          value={field.status}
          required
        >
          <option value="">Choose Status</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
        <span className="input-error"></span>
      </div>
      <div className="task-priority-container d-flex flex-column align-items-center">
        <label htmlFor="priority">Priority</label>
        <select
          onInvalid={handleInvalidInputs}
          onChange={handleInputChange}
          name="priority"
          value={field.priority}
          required
        >
          <option value="">Choose Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <span className="input-error"></span>
      </div>
      <button className="submit-button" type="submit">
        Add Task
      </button>
    </form>
  );
}
