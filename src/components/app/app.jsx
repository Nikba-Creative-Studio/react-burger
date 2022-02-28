import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';

import styles from './app.module.css';

import {
    HomePage,
    Login,
    ForgotPassword,
    ResetPassword,
    Register,
    NotFound404,
    ProfilePage,
    IngredientsPage
} from '../../pages/';

import { AppHeader } from "../app-header/app-header";
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import { OrderDetails } from '../burger-constructor/order-details/order-details';

import { Modal } from '../modal/modal';

import { fetchIngredients } from "../../services/actions/burger-ingredients";
import { hideOrderModal } from "../../services/actions/order-details";

import { ProtectedRoute } from '../protected-route/protected-route';

import { getUser } from '../../services/actions/auth';

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Данные пользователя
        dispatch(getUser())

        // Загружаем ингредиенты
        dispatch(fetchIngredients());
    }, [dispatch])

    const ModalSwitch = () => {

        const location = useLocation();
        const history = useHistory();
        const ingredientModal = location.state && location.state.ingredientModal;

        // Статус модального окна заказа
        const orderDetailsModal = useSelector(state => state.orderDetails.orderDetailsModal);

        // Функция закрытия модального окна ингредиентов
        const toggleModalIngredients = () => {
            history.goBack()
        }

        // Фунция закрытия модального окна заказа
        const toggleModalOrder = () => {
            dispatch(hideOrderModal())
        }

        return (
            <>
                <AppHeader />
                <main className={styles.main}>
                    <Switch location={ingredientModal || location}>
                        

                        <Route path='/ingredients/:id' exact>
                            <IngredientsPage />
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

                        <ProtectedRoute path='/profile' exact={true}>
                            <ProfilePage />
                        </ProtectedRoute>

                        <Route path='/' exact={true}>
                            <HomePage />
                        </Route>

                        <Route>
                            <NotFound404 />
                        </Route>
                    </Switch>

                    {ingredientModal &&
                        <Route path='/ingredients/:id'>
                            <Modal onClose={toggleModalIngredients} title="Детали ингредиента">
                                <IngredientDetails />
                            </Modal>
                        </Route>
                    }


                </main>

                {orderDetailsModal && (
                    <Modal onClose={toggleModalOrder} title="" >
                        <OrderDetails />
                    </Modal>

                )}

            </>
        )
    }

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}