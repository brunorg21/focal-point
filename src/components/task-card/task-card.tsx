import Image from "next/image";
import styles from "./task.module.scss";
import trashIcon from "@/assets/trash.svg";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "@/models/tasks";
import { Dialog } from "../dialog/dialog";
import { DeleteTaskDialog } from "../delete-task-dialog/delete-task-dialog";

interface TaskCardProps {
  setOpenDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  openDeleteTaskModal: boolean;
  task: ITask;
  onChange: () => void;
  onDelete: () => void;
}

export function TaskCard({
  setOpenDeleteTaskModal,
  task,
  onChange,
  onDelete,
  openDeleteTaskModal,
}: TaskCardProps) {
  return (
    <>
      <div className={styles.taskCardContainer}>
        <div className={styles.checkboxContainer}>
          <input onChange={onChange} checked={task.completed} type="checkbox" />
          {task.completed ? <s>{task.name}</s> : <span>{task.name}</span>}
        </div>

        <Image
          onClick={() => setOpenDeleteTaskModal(true)}
          src={trashIcon}
          alt=""
        />
      </div>
      <Dialog open={openDeleteTaskModal} setOpen={setOpenDeleteTaskModal}>
        <DeleteTaskDialog
          onDelete={onDelete}
          setOpen={setOpenDeleteTaskModal}
        />
      </Dialog>
    </>
  );
}
