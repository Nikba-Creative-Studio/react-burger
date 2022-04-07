import { FC } from "react";
import { formatDate } from "../../../utils/helpers";
import styles from "./order-card-date.module.css";

export const OrderCardDate: FC<{ time: string | undefined }> = ({ time }) => {
    const date = formatDate(time);
    return (
        <time className={styles.time}>{date}</time>
    );
};