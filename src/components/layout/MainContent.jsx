import React, { useState, useEffect } from "react";
import "../layout/MainContent.scss";
import { useTasks } from "../../hooks";
import { CheckBox } from "../CheckBox";
import { SelectedProjectProviderValue } from "../../context/index";
import { AddTask } from "./AddTask";

export const MainContent = () => {
  const {
    selectedProject,
    selectedProjectName
  } = SelectedProjectProviderValue();
  const { tasks, archived } = useTasks(selectedProject);
  const [showArchived, setShowArchived] = useState(false);

  const importedTasks = () => {
    let projectName = selectedProjectName;

    return (
      <>
        <div className="tasks">
          <h2>{projectName}</h2>
          <ul className="tasks-list">
            {tasks.map(task => (
              <li key={task.id}>
                <CheckBox id={task.id} />
                <span> {task.task} </span>
              </li>
            ))}
          </ul>
          <AddTask value={selectedProject} />
        </div>
        <hr />
        <div className="archivedTasks">
          <div
            className="title"
            onClick={() => {
              setShowArchived(!showArchived);
            }}
          >
            <span className={`arrow  ${showArchived ? "rotate" : ""}`}>
              <i class="fas fa-chevron-down fa-sm "></i>
            </span>
            <span>Archived Tasks</span>
          </div>

          <div className={`archived ${showArchived ? "show-archived" : ""}`}>
            <div className="archived-list">
              {archived.map(item => (
                <li> {item.task}</li>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return <div className="main-content">{importedTasks()}</div>;
};
