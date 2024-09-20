import { Dispatch, SetStateAction } from "react";
import styles from "./dialog.module.scss";

interface DialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function Dialog({ open, setOpen, children }: DialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <div className={styles.modalOverlay} onClick={handleClose} />}
      <dialog open={open} className={styles.dialog}>
        {children}
      </dialog>
    </>
  );
}
