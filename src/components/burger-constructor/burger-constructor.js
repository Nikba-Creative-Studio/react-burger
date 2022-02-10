import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

//Уникальный идентификатор для ингредиента
import uuid from 'react-uuid'

import { setIngredients, setBuns } from '../../services/actions/burger-constructor';

import { postOrder } from '../../services/actions/order-details';

import { Ingredient } from './ingredient/ingredient';
 
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {

    const dispatch = useDispatch();

    // Читаем данные из стора
    const constructorData = useSelector(state => state.constructorIngredients.ingredients);
    const constructorBunsData = useSelector(state => state.constructorIngredients.buns);

    // Обшая стоимость бургера, пока берем из масива ингредиентов
    const total_ingredients = constructorData.reduce((acc, cur) => acc + cur.price, 0)
    const total_buns = (constructorBunsData) ? constructorBunsData.price : 0
    const total = total_ingredients + total_buns

    // Функция отправки заказа на сервер
    const sendOrder = () => {
        // Создаем объект заказа
        const order_ids = constructorData.map(item => item._id)
        if(constructorBunsData) order_ids.push(constructorBunsData._id)
        dispatch(postOrder(order_ids))
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
                
                <Ingredient item={constructorBunsData} type='top' isLocked={true} />
                
                <div className={styles.ingredients}>
                    {constructorData.map((item) => ( <Ingredient  key={uuid()}  item={item} isLocked={false} /> ))}
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