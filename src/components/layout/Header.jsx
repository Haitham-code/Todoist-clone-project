import React from "react";
import "./Header.scss";
import logo from "../../pics/todo-icon-15.jpg";
import { TaskHeaderStateValue } from "../../context/index";
import { firebase } from "../../firebase";
import { AuthProviderValue } from "../../context/index";

//import { useTasks } from "../../hooks/index";

export const Header = () => {
  //const { tasks, archived } = useTasks("NEXT_7");
  //console.log(tasks);

  const { quickState, setQuickState } = TaskHeaderStateValue();
  const { user, setUser } = AuthProviderValue();

  const out = () => {
    firebase.auth().signOut();
    setUser(null);
  };

  return (
    <div className="header">
      <div className="inner-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="title">
          <div className="title-inner">Todoist Clone</div>
        </div>
        <div className="add-quick-task">
          <div
            className="add-quick-task-inner"
            onClick={() => {
              setQuickState(true);
            }}
          >
            <span>
              <i className="fas fa-plus"></i>
            </span>
            <span>Add Quick Task</span>
          </div>
        </div>
        <div className="signout">
          <button
            onClick={() => {
              out();
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
