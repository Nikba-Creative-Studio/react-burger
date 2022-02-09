import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from './app.module.css';

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
//import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';

import { Modal } from '../modal/modal';

import { deselectIngredient, fetchIngredients } from "../../services/actions/burger-ingredients";

export const App = () => {

    const dispatch = useDispatch();

    // Загружаем выбраный ингредиент
    const ingredientsModal = useSelector(state => state.ingredients.ingredient);
    
    // Функция закрытия модального окна
    const toggleModalIngredients = (item) => {
        dispatch(deselectIngredient())
    }

    useEffect(() => {
        // Загружаем ингредиенты
        dispatch(fetchIngredients());
    }, [dispatch])

    //
    //<BurgerConstructor />

    return (
        <>
            <AppHeader />
            <main className={styles.main}>   
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                </DndProvider> 
            </main>

            {ingredientsModal && (
                <Modal
                    onClose={toggleModalIngredients}
                    title="Детали ингредиента"
                >
                    <IngredientDetails />
                </Modal>
            )}
        </>
    )
}
