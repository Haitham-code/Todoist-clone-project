import React from "react";
import "./App.scss";
import {
  ProjectsProvider,
  SelectedProjectProvider,
  TaskHeaderState
} from "../src/context/index";

import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";

export const App = () => {
  return (
    <TaskHeaderState>
      <ProjectsProvider>
        <SelectedProjectProvider>
          <div className="App">
            <Header />
            <Content />
          </div>
        </SelectedProjectProvider>
      </ProjectsProvider>
    </TaskHeaderState>
  );
};
