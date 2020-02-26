import React, { useState, useEffect } from "react";
import firebase from "firebase";
import momnet from "moment";
import { ProjectsProviderValue } from "../../context/index";
import { TaskHeaderStateValue } from "../../context/index";

export const AddTask = selectedProject => {
  const { quickState, setQuickState } = TaskHeaderStateValue();
  const [showTask, setShowTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [menueItem, setMenueItem] = useState("");
  const { projects } = ProjectsProviderValue();
  const [project, setProject] = useState("");

  const projectId = selectedProject.value;

  useEffect(() => {
    if (quickState) {
      setShowTask(true);
    }
  }, [quickState]);

  const addTask = () => {
    let collatedDate;
    if (menueItem === "TODAY") {
      collatedDate = momnet().format("DD/MM/YYYY");
    } else if (menueItem === "NEXT_7") {
      collatedDate = momnet()
        .add(7, "days")
        .format("DD/MM/YYYY");
    }

    taskName &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          task: taskName,
          projectId: project || projectId,
          userId: "haitham",
          date: collatedDate || ""
        })
        .then(() => {
          setShowTask(false);
          setTaskName("");
          setQuickState(false);
          document.getElementById("select-1").selectedIndex = 0;
          document.getElementById("select-2").selectedIndex = 0;
          document.getElementById("task-input").value = "";
        });
  };

  return (
    <div className="add-task">
      <div className="add-task-inner">
        <div
          onClick={() => {
            setShowTask(true);
          }}
          className="add-task-item"
        >
          <span className="add-task-icon">
            <i class="fas fa-plus"></i>
          </span>
          <span className="add-task-title">Add task</span>
        </div>

        <div className={`task-box ${showTask ? "show-task" : ""}`}>
          <div className="task-popup">
            <div className="task-input">
              <div className="add-task-title">Add Task</div>
              <div className="task-name">Task name</div>
              <input
                id="task-input"
                type="text"
                onChange={e => setTaskName(e.target.value)}
              />
            </div>
            <div className="select-boxes">
              <select
                id="select-1"
                className="select-date"
                onChange={e => setMenueItem(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  Choose date
                </option>
                <option value="TODAY">Today</option>
                <option value="NEXT_7">Next 7 days</option>
              </select>
              <select
                id="select-2"
                className="select-project"
                onChange={e => setProject(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  Choose project
                </option>
                {projects.map(project => (
                  <option value={project.projectId}>{project.name}</option>
                ))}
              </select>
            </div>
            <div className="buttons">
              <button className="add" onClick={() => addTask()}>
                Add
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setShowTask(false);
                  setQuickState(false);
                  document.getElementById("select-1").selectedIndex = 0;
                  document.getElementById("select-2").selectedIndex = 0;
                  document.getElementById("task-input").value = "";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
