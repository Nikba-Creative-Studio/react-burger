//import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

//Уникальный идентификатор для ингредиента
import uuid from 'react-uuid'

import { 
    setIngredients, 
    setBuns,
    removeIngredient,
} from '../../services/actions/burger-constructor';

import { DragIcon, ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';


//Post API Url
const API_ORDER_URL = 'https://norma.nomoreparties.space/api/orders'

export const BurgerConstructor = () => {

    const dispatch = useDispatch();

    // Читаем данные из стора
    const constructorData = useSelector(state => state.constructorIngredients.ingredients);
    const constructorBunsData = useSelector(state => state.constructorIngredients.buns);
    

    const toggleModalOrder = () => {
        // Отправляем заказ на сервер
    }

    //Експериментальная функция для удаления ингредиентов (Проверка работаспособности totalPrice)
    const removeItem = (id) => {
        dispatch(removeIngredient(id))
    }

    //Рисуем ингредиент конструктора
    const constructorItem = (item, type, isLocked) => {
        return (
            item &&
                <li key={uuid()} className={styles.ingredients_item}>
                    {!isLocked && <DragIcon />}
                    <ConstructorElement
                        isLocked={isLocked}
                        type={type}
                        text={item.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => removeItem(item.uid)}
                    />
                </li>
        )
    }

    // Обшая стоимость бургера, пока берем из масива ингредиентов
    const total = constructorData.reduce((acc, cur) => acc + cur.price, 0)

    // Функция отправки заказа на сервер
    const sendOrder = () => {
        // Создаем объект заказа
        fetch(API_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: constructorData.map(e => e._id),
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => {
            //console.log(data);

            // Показываем модальное окно с сообщением об успешной отправке заказа
            toggleModalOrder(data.order.number);

            // Очищаем конструктор
            //setConstructor([]);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // Перемешение ингредиентов в конструкторе
    const [{isOver}, drop] = useDrop({
        accept: 'ingredients',
        drop: (item) => {
            // Передаем ингредиент в конструктор
            //console.log(item);
            onDrop(item);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    const onDrop = (item) => {
        // Передаем ингредиент в конструктор
        (item.type === 'bun') ? dispatch(setBuns(item, uuid())) : dispatch(setIngredients(item, uuid()));
    }

    return (
        <section className={styles.constructor_container}>
            <div className={!isOver ? styles.constructor_space : `${styles.constructor_space} ${styles.active}` } ref={drop}>
                <ul className={styles.ingredients}>
                    {constructorItem(constructorBunsData, 'top', true)}

                    {constructorData.map((item) => (constructorItem(item, '', false)))}

                    {constructorItem(constructorBunsData, 'bottom', true)}
                </ul>
            </div>

            <div className={styles.constructor_footer}>
                <div className={styles.total_wrapper}>
                    <span className={styles.total}>{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button 
                    type="primary" 
                    size="medium"
                    onClick={sendOrder}
                >
                    Оформить заказ
                </Button>
            </div>
            
        </section>
    )
}