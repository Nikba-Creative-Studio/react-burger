import { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

//Уникальный идентификатор для ингредиента
import uuid from 'react-uuid'

import { setIngredients, setBuns, moveIngredients } from '../../services/actions/burger-constructor';

import { postOrder } from '../../services/actions/order-details';
import { Ingredient } from './ingredient/ingredient';
 
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

import { Loader } from '../loader/loader';

export const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // Читаем данные из стора
    const constructorData = useSelector(state => state.constructorIngredients.ingredients);
    const constructorBunsData = useSelector(state => state.constructorIngredients.buns);
    const isLogin = useSelector(state => state.auth.isLogin)
    const isLoading = useSelector(state => state.orderDetails.isLoading);

    
    // Обшая стоимость бургера, пока берем из масива ингредиентов
    const total_ingredients = constructorData.reduce((acc, cur) => acc + cur.price, 0)
    const total_buns = (constructorBunsData) ? constructorBunsData.price : 0
    const total = total_ingredients + total_buns

    // Функция отправки заказа на сервер
    const sendOrder = () => {
        //Проверка авторизации
        if(!isLogin) {
            history.replace({ pathname: '/login' });
            return;
        }
        // Создаем объект заказа
        const orderIds = constructorData.map(item => item._id)
        if(constructorBunsData) orderIds.push(constructorBunsData._id)
        dispatch(postOrder(orderIds))
    }

    // Перемешение ингредиентов в конструкторе
    const [{isOver}, drop] = useDrop({
        accept: 'ingredients',
        drop: (item) => {
            // Передаем ингредиент в конструктор
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

    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveIngredients(dragIndex, hoverIndex))
    }, [dispatch]);

    if(isLoading) {
        console.log('Загрузка...');
        return <Loader />
    }

    return (
        <section className={styles.constructor_container}>
            <div className={!isOver ? styles.constructor_space : `${styles.constructor_space} ${styles.active}` } ref={drop}>
                
                <Ingredient item={constructorBunsData} type='top' isLocked={true} />
                
                <div className={styles.ingredients}>
                    {constructorData.map((item, index) => ( <Ingredient  key={item.uid}  item={item} isLocked={false} id={item._id} index={index} moveIngredient={moveIngredient} /> ))}
                </div>
                
                <Ingredient item={constructorBunsData} type='bottom' isLocked={true} />
            </div>

            <div className={styles.constructor_footer}>
                <div className={styles.total_wrapper}>
                    <span className={styles.total}>{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button 
                    type="primary" 
                    size="medium"
                    disabled={(constructorData.length === 0 || !constructorBunsData) ? true : false}
                    onClick={sendOrder}
                >
                    Оформить заказ
                </Button>
            </div>
            
        </section>
    )
}