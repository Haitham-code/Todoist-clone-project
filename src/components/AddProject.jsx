import React, { useState, useEffect } from "react";
import { ProjectsProviderValue } from "../context/index";
import { generatePushID } from "../helpers/index";
import firebase from "firebase";

export const AddProject = props => {
  const { projects, setProjects } = ProjectsProviderValue();
  const [show, setShow] = useState(false);

  const [projectName, setProjectName] = useState("");

  const projectId = generatePushID();

  const input = document.getElementById("input");

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: "haitham"
        })
        .then(() => {
          setProjects([]);
          setProjectName("");
          setShow(false);
          input.value = "";
        });
  };

  useEffect(() => {
    setShow(props.showState);
  }, [props.showState]);

  return (
    <>
      <div
        className="add-project-inner"
        onClick={() => {
          setShow(!show);
        }}
      >
        <span className="font-awsome">
          <i class="fas fa-plus"></i>
        </span>
        <span className="add-project">Add project</span>
      </div>

      <div className={`add-project-show ${show ? "show" : ""}`}>
        <div className="text-box">
          <div className="title">Add Project</div>
          <div className="project-name">Project Name</div>
          <input
            id="input"
            type="text"
            onChange={e => setProjectName(e.target.value)}
          />
          <div className="buttons">
            <button className="add" onClick={() => addProject()}>
              Add
            </button>
            <button
              className="cancel"
              onClick={() => {
                setShow(!show);
                props.value(false);
                input.value = "";
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
