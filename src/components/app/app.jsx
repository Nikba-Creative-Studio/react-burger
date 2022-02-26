import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styles from './app.module.css';

import { HomePage, Login, ForgotPassword, ResetPassword, Register, NotFound404 } from '../../pages/';

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
        <Router>
            <AppHeader />
            <main className={styles.main}>
                <Switch>
                    <Route path='/' exact={true}>
                        <HomePage />
                    </Route>

                    <Route path='/login' exact={true}>
                        <Login />
                    </Route>

                    <Route path='/forgot-password' exact={true}>
                        <ForgotPassword />
                    </Route>

                    <Route path='/reset-password' exact={true}>
                        <ResetPassword />
                    </Route>

                    <Route path='/register' exact={true}>
                        <Register />
                    </Route>

                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>
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
        </Router>
    )
}
