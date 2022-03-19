import { FC } from 'react';
import styles from "./modal-overlay.module.css";

export const ModalOverlay: FC = () => {
    return (
        <div className={styles.modal_overlay} />
    )
}