import React from 'react';
import styles from './app.module.css';

import { data } from '../../utils/data';
import { constructData } from '../../utils/data';

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

export const App = () => {
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients ingredientsData={data} />
                <BurgerConstructor constructData={constructData} />
            </main>
        </>
    )
}
