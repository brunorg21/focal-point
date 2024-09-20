import { Dispatch, SetStateAction } from "react";
import { Button } from "../button/button";
import styles from "./delete-task-dialog.module.scss";

interface DeleteTaskDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
}

export function DeleteTaskDialog({ setOpen, onDelete }: DeleteTaskDialogProps) {
  return (
    <div className={styles.container}>
      <h1>Deletar tarefa</h1>
      <div className={styles.container}>
        <p className={styles.deleteMessage}>
          Tem certeza que deseja deletar esta tarefa?
        </p>
        <div className={styles.buttonWrapper}>
          <Button variant="cancel" type="button" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={onDelete} variant="delete">
            Deletar
          </Button>
        </div>
      </div>
    </div>
  );
}
