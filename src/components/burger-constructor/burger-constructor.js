import { useContext } from 'react';
import PropTypes from 'prop-types';

import { DragIcon, ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

import { ConstructorContext } from '../../services/constructorContext';

//Post API Url
const API_ORDER_URL = 'https://norma.nomoreparties.space/api/orders'

export const BurgerConstructor = () => {

    // Читаем данные из контекста
    const { constructor, setConstructor, toggleModalOrder } = useContext(ConstructorContext);

    //Експериментальная функция для удаления ингредиентов (Проверка работаспособности totalPrice)
    const removeItem = (id) => {
        // Создаем новый массив ингредиентов
        setConstructor(constructor.filter((e) => e._id !== id));
    }

    //Рисуем ингредиент конструктора
    const constructorItem = (item, type, isLocked) => {
        return (
            item &&
                <li key={item._id} className={styles.ingredients_item}>
                    {!isLocked && <DragIcon />}
                    <ConstructorElement
                        type={type}
                        text={item.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => removeItem(item._id)}
                    />
                </li>
        )
    }

    // Обшая стоимость бургера, пока берем из масива ингредиентов
    const total = constructor.reduce((acc, cur) => acc + cur.price, 0)

    // Функция отправки заказа на сервер
    const sendOrder = () => {
        // Создаем объект заказа
        fetch(API_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: constructor.map(e => e._id),
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
            toggleModalOrder(data);

            // Очищаем конструктор
            setConstructor([]);
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <section className={styles.constructor_container}>

            {constructorItem(constructor.filter((item) => item.type === 'bun')[0], 'top', true)}

            <ul className={styles.ingredients}>
                {constructor
                        .filter((item) => item.type !== 'bun')
                        .map((item) => (constructorItem(item, '', false)))
                }
            </ul>

            {constructorItem(constructor.filter((item) => item.type === 'bun')[1], 'bottom', true)}

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

// Проверка типов пропсов
BurgerConstructor.propTypes = {
    ingredients: PropTypes.array
}