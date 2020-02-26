import React, { useState } from "react";
import firebase from "firebase";
import {
  ProjectsProviderValue,
  SelectedProjectProviderValue
} from "../../context/index";

export const IndividualProject = ({ project }) => {
  const [confirm, setConfirm] = useState(false);
  const { projects, setProjects } = ProjectsProviderValue();
  const { setSelectedProject } = SelectedProjectProviderValue();

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("INBOX");
      });
  };

  return (
    <>
      <span className="project-fontawsome">
        <i class="fas fa-dot-circle fa-sm"></i>
      </span>
      <span className="project-item">{project.name}</span>
      <span className="delete" onClick={() => setConfirm(true)}>
        <i class="fas fa-trash-alt"></i>
      </span>

      <div
        className={`delete-project-model ${confirm ? " delete-overlay" : ""}`}
      >
        <div className="delete-box">
          <p>Do you want to delete project ("{project.name}") ?</p>
          <button className="yes" onClick={() => deleteProject(project.docId)}>
            Yes
          </button>
          <button className="no" onClick={() => setConfirm(false)}>
            No
          </button>
        </div>
      </div>
    </>
  );
};
