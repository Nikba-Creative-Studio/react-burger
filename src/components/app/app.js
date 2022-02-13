import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from './app.module.css';

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import { OrderDetails } from '../burger-constructor/order-details/order-details';

import { Modal } from '../modal/modal';

import { deselectIngredient, fetchIngredients } from "../../services/actions/burger-ingredients";
import { hideOrderModal } from "../../services/actions/order-details";

export const App = () => {

    const dispatch = useDispatch();

    // Загружаем выбраный ингредиент
    const ingredientsModal = useSelector(state => state.ingredients.ingredient);

    // Статус модального окна заказа
    const orderDetailsModal = useSelector(state => state.orderDetails.orderDetailsModal);
    
    // Функция закрытия модального окна ингредиентов
    const toggleModalIngredients = () => {
        dispatch(deselectIngredient())
    }

    // Фунция закрытия модального окна заказа
    const toggleModalOrder = () => {
        dispatch(hideOrderModal())
    }

    useEffect(() => {
        // Загружаем ингредиенты
        dispatch(fetchIngredients());
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <main className={styles.main}>   
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider> 
            </main>

            {orderDetailsModal && (
                <Modal onClose={toggleModalOrder} title="" >
                    <OrderDetails />
                </Modal>

            )}

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
