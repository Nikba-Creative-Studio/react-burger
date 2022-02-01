import { useEffect, useState } from 'react';
import styles from './app.module.css';

import { Modal } from '../modal/modal';
import { AppHeader } from "../app-header/app-header";

import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';

import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { OrderDetails } from '../burger-constructor/order-details/order-details';

//API Url
const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {

    const [ingredients, setIngredients] = useState([]);
    const [modalData, setModalData] = useState({})

    const [isModalOpen, setIsModalOpen] = useState({
        ingredientsModal: false,
        orderDetailsModal: false
    })

    // Функция открытия / закрытия модального окна заказа
    const toggleModalOrder = () => {
        //Открываем/Закрываем модальное окно
        setIsModalOpen({
            ...isModalOpen,
            orderDetailsModal: !isModalOpen.orderDetailsModal
        })
    }

    // Функция открытия / закрытия модального окна ингредиентов
    const toggleModalIngredients = (item) => {
        //Отпровляем данные в модальное окно
        setModalData(item);

        //Открываем/Закрываем модальное окно
        setIsModalOpen({
            ...isModalOpen,
            ingredientsModal: !isModalOpen.ingredientsModal
        })
    }

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
                <BurgerIngredients ingredientsData={ingredients} toggleModal={toggleModalIngredients} />
                <BurgerConstructor constructData={ingredients} toggleModal={toggleModalOrder} />
            </main>
            }

            {isModalOpen.ingredientsModal && (
                <Modal
                    onClose={toggleModalIngredients}
                    title="Детали ингредиента"
                >
                    <IngredientDetails data={modalData} />
                </Modal>
            )}

            {isModalOpen.orderDetailsModal && 
             <Modal onClose={toggleModalOrder} title="" >
                <OrderDetails />
            </Modal>
            }

        </>
    )
}
