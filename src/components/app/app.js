import React, { useEffect, useState } from 'react';
import styles from './app.module.css';

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

//API Url
const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // Запрос на сервер
        fetch(API_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Ошибка получения данных с сервера');
            })
            .then(({ data }) => {
                //console.log(data);
                // Передаем данные в стейт
                setIngredients(data);
            })
            .catch((error) => console.log( error ));
    }, []);



    return (
        <>
            <AppHeader />
            {ingredients.length > 0 && 
            <main className={styles.main}>    
                <BurgerIngredients ingredientsData={ingredients} />
                <BurgerConstructor constructData={ingredients} />
            </main>
            }
        </>
    )
}
