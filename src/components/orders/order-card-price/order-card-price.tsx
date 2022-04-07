import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card-price.module.css";

export const OrderCardPrice: FC<{ price: number }> = ({ price }) => {
    return (
        <div className={styles.price}>
            <span>{price}</span>
            <CurrencyIcon type="primary" />
        </div>
    );
};