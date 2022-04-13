import { useCallback, FC } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks'
import { useDrop } from 'react-dnd';

//Уникальный идентификатор для ингредиента
import uuid from 'react-uuid'

import { setIngredients, setBuns, moveIngredients } from '../../services/actions/burger-constructor';

import { postOrder } from '../../services/actions/order-details';
import { Ingredient } from './ingredient/ingredient';
 
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

import { Loader } from '../loader/loader';

import { TIngredientData } from '../../types/types';

export const BurgerConstructor: FC = () => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    // Читаем данные из стора
    const { ingredients, buns}  = useAppSelector((state) => state.constructorIngredients);
    const isLogin: boolean = useAppSelector((state) => state.auth.isLogin)
    const isLoading: boolean = useAppSelector((state) => state.orderDetails.isLoading);

    
    // Обшая стоимость бургера, пока берем из масива ингредиентов
    const total_ingredients: number | null = ingredients.reduce((acc, cur) => acc + cur.price, 0)

    const total_buns = (buns) ? buns.price : 0
    
    const total: number | null = total_ingredients + total_buns

    // Функция отправки заказа на сервер
    const sendOrder = (): void => {
        //Проверка авторизации
        if(!isLogin) {
            history.replace({ pathname: '/login' });
            return;
        }
        // Создаем объект заказа
        const orderIds = ingredients.map(item => item._id)
        if(buns) orderIds.push(buns._id)
        dispatch(postOrder(orderIds))
    }

    // Перемешение ингредиентов в конструкторе
    const [{isOver}, drop] = useDrop({
        accept: 'ingredients',
        drop: (item: TIngredientData) => {
            // Передаем ингредиент в конструктор
            onDrop(item);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    const onDrop = (item: TIngredientData): void => {
        // Передаем ингредиент в конструктор
        (item.type === 'bun') ? dispatch(setBuns(item)) : dispatch(setIngredients(item, uuid()));
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
                
                {!ingredients.length && !buns &&        
                    <div className={styles.empty_constructor}>Выберите ингредиенты</div>
                }

                <Ingredient item={buns} type='top' isLocked={true} />
                
                <div className={styles.ingredients}>
                    {ingredients.length > 0 &&
                        ingredients.map((item, index) => ( 
                            <Ingredient  
                                key={item.uid}  
                                item={item} 
                                isLocked={false} 
                                id={item._id} 
                                index={index} 
                                moveIngredient={moveIngredient} 
                            /> ))
                    }
                </div>
                
                <Ingredient item={buns} type='bottom' isLocked={true} />
            </div>

            <div className={styles.constructor_footer}>
                <div className={styles.total_wrapper}>
                    <span className={styles.total}>{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button 
                    type="primary" 
                    size="medium"
                    disabled={(ingredients.length === 0 || !buns) ? true : false}
                    onClick={sendOrder}
                >
                    Оформить заказ
                </Button>
            </div>
            
        </section>
    )
}