import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  ProjectsProvider,
  SelectedProjectProvider,
  TaskHeaderState
} from "../src/context/index";
import { Login } from "../src/components/Login";

import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import { AuthProviderValue } from "../src/context/index";

export const App = () => {
  const { user, setUser } = AuthProviderValue();
  return (
    <>
      {user ? (
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
      ) : (
        <Login />
      )}
    </>
  );
};
