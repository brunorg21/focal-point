"use client";

import { Header } from "@/components/header/header";
import styles from "./page.module.scss";
import { TaskCard } from "@/components/task-card/task-card";
import { Button } from "@/components/button/button";
import { Dialog } from "@/components/dialog/dialog";
import { useEffect, useState } from "react";
import { AddTaskDialog } from "@/components/add-task-dialog/add-task-dialog";
import { ITask } from "@/models/tasks";

export default function Home() {
  const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] =
    useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const tasksOnStorage = localStorage.getItem("tasks");
    if (tasksOnStorage) {
      setTasks(JSON.parse(tasksOnStorage));
    }
  }, []);

  function toggleTaskCompletion(taskId: string) {
    setTasks((state) => {
      const updatedTasks = state.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  }

  function handleDeleteTask(taskId: string) {
    setTasks((state) => {
      const updatedTasks = state.filter((task) => task.id !== taskId);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
    setOpenDeleteTaskModal(false);
  }

  const completedTasks = tasks.filter((task) => task.completed);
  const remainingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.taskContainer}>
          <h1>Suas tarefas de hoje</h1>

          {remainingTasks.length > 0 ? (
            remainingTasks.map((task) => {
              return (
                <TaskCard
                  openDeleteTaskModal={openDeleteTaskModal}
                  onChange={() => toggleTaskCompletion(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  key={task.id}
                  task={task}
                  setOpenDeleteTaskModal={setOpenDeleteTaskModal}
                />
              );
            })
          ) : (
            <p>Nenhuma tarefa á ser realizada</p>
          )}

          <h1>Tarefas finalizadas</h1>

          {completedTasks.length > 0 ? (
            completedTasks.map((task) => {
              return (
                <TaskCard
                  openDeleteTaskModal={openDeleteTaskModal}
                  onChange={() => toggleTaskCompletion(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  key={task.id}
                  task={task}
                  setOpenDeleteTaskModal={setOpenDeleteTaskModal}
                />
              );
            })
          ) : (
            <p>Nenhuma tarefa finalizada</p>
          )}
          <Button onClick={() => setOpenNewTaskModal(true)}>
            Adicionar tarefa
          </Button>
          <Dialog setOpen={setOpenNewTaskModal} open={openNewTaskModal}>
            <AddTaskDialog setTasks={setTasks} setOpen={setOpenNewTaskModal} />
          </Dialog>
        </div>
      </main>
    </div>
  );
}
