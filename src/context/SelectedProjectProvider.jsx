import React, { createContext, useContext, useState } from "react";

export const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState("INBOX");
  const [selectedProjectName, setSelectedProjectName] = useState("");

  return (
    <SelectedProjectContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        selectedProjectName,
        setSelectedProjectName
      }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const SelectedProjectProviderValue = () =>
  useContext(SelectedProjectContext);
