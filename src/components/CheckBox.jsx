import React from "react";
import firebase from "firebase";

export const CheckBox = ({ id }) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .update({
        archived: true
      });
  };

  return (
    <span className="checkbox-holder" onClick={archiveTask}>
      <i className="fas fa-archive"></i>
      <span className="tool-tip">Archive task</span>
    </span>
  );
};
