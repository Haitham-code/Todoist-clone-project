import React, { useState } from "react";
import "../layout/Sidebar.scss";

import { Projects } from "../Projects";
import { AddProject } from "../../components/AddProject";
import { SelectedProjectProviderValue } from "../../context/index";

export const Sidebar = () => {
  const {
    selectedProject,
    setSelectedProject,
    setSelectedProjectName
  } = SelectedProjectProviderValue();

  const [hideProjects, setHideProjects] = useState(false);

  const [show, setShow] = useState(false);

  const quickShow = data => {
    setShow(data);
  };

  // render functions

  return (
    <div className="sidebar">
      <div className="list-holder">
        <div className="top-section">
          <div
            className="inbox"
            onClick={() => {
              setSelectedProject("INBOX");
              setSelectedProjectName("Inbox");
            }}
          >
            <div className="first-item">
              <span className="inbox-font">
                <i class="fas fa-inbox"></i>
              </span>
              <span>Inbox</span>
            </div>
          </div>
          <div
            className="today"
            onClick={() => {
              setSelectedProject("TODAY");
              setSelectedProjectName("Today");
            }}
          >
            <div className="second-item">
              <span className="today-font">
                <i class="fas fa-calendar-week"></i>
              </span>
              <span>Today</span>
            </div>
          </div>
          <div
            className="next-7"
            onClick={() => {
              setSelectedProject("NEXT_7");
              setSelectedProjectName("Next 7 days");
            }}
          >
            <div className="third-item">
              <span className="next_7-font">
                <i class="far fa-calendar-alt"></i>
              </span>
              <span>Next 7 days</span>
            </div>
          </div>
        </div>
        <div className="middle-section">
          <div className="projects">
            <div className="project-head">
              <div
                className="projects-title"
                onClick={() => {
                  setHideProjects(!hideProjects);
                }}
              >
                <span className={`arrow  ${hideProjects ? "hide" : ""}`}>
                  <i class="fas fa-chevron-down fa-1x"></i>
                </span>
                <span className="title">Projects</span>
              </div>
              <span className="quick-show" onClick={() => setShow(!show)}>
                <i class="fas fa-plus"></i>
              </span>
            </div>

            <div className={`hide-list-wrapper  ${hideProjects ? "hide" : ""}`}>
              <div className="outer-projects">
                <Projects />
              </div>
              <div className="add-project">
                <AddProject value={quickShow} showState={show} />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <div className="bottom-options">
            <div>Labels</div>
            <div>Filter</div>
          </div>
        </div>
      </div>
    </div>
  );
};
