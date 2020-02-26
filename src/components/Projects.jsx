import React, { useState } from "react";
import {
  ProjectsProviderValue,
  SelectedProjectProviderValue
} from "../context/index";
import { IndividualProject } from "../components/layout/IndividualProject";

export const Projects = () => {
  const { projects } = ProjectsProviderValue();
  const {
    setSelectedProject,
    setSelectedProjectName
  } = SelectedProjectProviderValue();
  const [active, setActive] = useState(false);

  return (
    <div className="projects-inner">
      {projects.map(project => (
        <li
          key={project.projectId}
          className={active ? "active-sideMenue-project" : "sideMenue-project"}
          onClick={() => {
            setSelectedProject(project.projectId);
            setSelectedProjectName(project.name);
            setActive(true);
          }}
        >
          <IndividualProject project={project} />
        </li>
      ))}
    </div>
  );
};
