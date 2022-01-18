import * as React from 'react';
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

export const App = () => {
    return (
        <>
            <AppHeader />
            <BurgerIngredients />
            <BurgerConstructor />
        </>
    )
}
