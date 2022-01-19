import React from 'react';
import { DragIcon, ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ constructData }) => {
    
    // Total Price
    const total = constructData.reduce((acc, cur) => acc + cur.price, 0)

    return (
        <section className={styles.constructor_container}>
        </section>
    )
}
