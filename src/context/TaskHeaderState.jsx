import React, { createContext, useContext, useState } from "react";

export const TaskHeaderContext = createContext();

export const TaskHeaderState = ({ children }) => {
  const [quickState, setQuickState] = useState(false);

  return (
    <TaskHeaderContext.Provider
      value={{
        quickState,
        setQuickState
      }}
    >
      {children}
    </TaskHeaderContext.Provider>
  );
};

export const TaskHeaderStateValue = () => useContext(TaskHeaderContext);
