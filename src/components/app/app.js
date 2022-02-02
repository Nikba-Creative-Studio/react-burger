import { useEffect, useState } from 'react';
import styles from './app.module.css';

import { ConstructorContext } from '../../services/constructorContext'

import { Modal } from '../modal/modal';
import { AppHeader } from "../app-header/app-header";

import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';

import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { OrderDetails } from '../burger-constructor/order-details/order-details';

//API Url
const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

export const App = () => {

    const [ingredients, setIngredients] = useState([]);
    const [constructor, setConstructor] = useState([]);
    const [modalData, setModalData] = useState(null)
    const [modalOrderData, setModalOrderData] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState({
        ingredientsModal: false,
        orderDetailsModal: false
    })

    // Функция открытия / закрытия модального окна заказа
    const toggleModalOrder = (data) => {
        //Отпровляем данные заказа в модальное окно
        setModalOrderData(data);

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
                setIngredients(data)
                setConstructor(data)
            })
            .catch((error) => console.log( error ));
    }, []);



    return (
        <>
            <AppHeader />
            {ingredients.length > 0 && 
            <main className={styles.main}>    
                <ConstructorContext.Provider value={{ constructor, setConstructor, toggleModalOrder }}>
                    <BurgerIngredients ingredientsData={ingredients} toggleModal={toggleModalIngredients} />
                    <BurgerConstructor />
                </ConstructorContext.Provider>
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
                <OrderDetails data={modalOrderData} />
            </Modal>
            }

        </>
    )
}
