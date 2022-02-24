import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styles from './app.module.css';

import { HomePage, Login, ForgotPassword, ResetPassword, Register } from '../../pages/';

import { AppHeader } from "../app-header/app-header";
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
                <Router>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>

                    <Route path='/login' exact>
                        <Login />
                    </Route>

                    <Route path='/forgot-password' exact>
                        <ForgotPassword />
                    </Route>

                    <Route path='/reset-password' exact>
                        <ResetPassword />
                    </Route>

                    <Route path='/register' exact>
                        <Register />
                    </Route>

                </Router>
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
