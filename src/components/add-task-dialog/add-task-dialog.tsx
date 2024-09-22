import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "../button/button";
import styles from "./add-task-dialog.module.scss";
import { ITask } from "@/models/tasks";

interface AddTaskDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
}

export function AddTaskDialog({ setOpen, setTasks }: AddTaskDialogProps) {
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title) {
      setTasks((state) => {
        const updatedTasks = [
          ...state,
          { id: crypto.randomUUID(), name: title, completed: false },
        ];

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        return updatedTasks;
      });
      setError("");
      setTitle("");
      setOpen(false);
    } else {
      setError("Preencha o campo com o nome da tarefa");
    }
  }

  return (
    <div className={styles.container}>
      <h1>Nova tarefa</h1>
      <form onSubmit={handleSubmit} className={styles.container} action="">
        <div className={styles.formInputWrapper}>
          <label htmlFor="title">Título</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite"
            type="text"
            id="title"
            value={title}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="cancel" type="button" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </div>
  );
}
