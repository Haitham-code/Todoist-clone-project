import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
import moment from "moment";
import { AuthProviderValue } from "../context/index";

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archived, setArchived] = useState([]);
  const { user, setUser } = AuthProviderValue();

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", user.uid);

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      let newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      let filteredTasks = [];

      selectedProject !== "INBOX" &&
      selectedProject !== "TODAY" &&
      selectedProject !== "NEXT_7"
        ? (filteredTasks = newTasks.filter(
            task => task.projectId === selectedProject && task.archived !== true
          ))
        : selectedProject === "INBOX"
        ? (filteredTasks = newTasks.filter(
            task => task.date === "" && task.archived !== true
          ))
        : selectedProject === "TODAY"
        ? (filteredTasks = newTasks.filter(
            task =>
              task.date === moment().format("DD/MM/YYYY") &&
              task.archived !== true
          ))
        : selectedProject === "NEXT_7"
        ? (filteredTasks = newTasks.filter(
            task =>
              moment(task.date, "DD/MM/YYYY").diff(moment(), "days") <= 7 &&
              moment(task.date, "DD/MM/YYYY").diff(moment(), "days") > 1 &&
              task.archived !== true
          ))
        : (filteredTasks = newTasks);

      setTasks(filteredTasks);

      setArchived(newTasks.filter(task => task.archived !== false));
    });
  }, [selectedProject]);

  return { tasks, archived };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const { user, setUser } = AuthProviderValue();

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", user.uid)
      .orderBy("projectId")
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};

/**unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment.format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === "0"
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : (unsubscribe = unsubscribe);

        **/

/*setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              task =>
                moment(task.data, "DD/MM/YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );**/
