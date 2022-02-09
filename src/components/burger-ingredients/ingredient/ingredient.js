import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { selectIngredient } from '../../../services/actions/burger-ingredients';

import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const Ingredient = ({ item }) => {
    
    const dispatch = useDispatch();
    
    const { image, price, name } = item;
    
    const constructorIngredients = useSelector(state => state.ingredients.constructorIngredients);

    // Количество ингредиента в конструкторе
    const count = constructorIngredients.filter(ingredient => ingredient.id === item.id).length;

    // Открываем модальное окно описание ингредиента
    const toggleModal = (item) => {
        dispatch(selectIngredient(item));
    }

    // Перемещаем ингредиент в конструктор
    // TODO: переделать на перемещение в конструктор
    const [{ isDrag }, drag] = useDrag({
        type: "ingredients",
        item: item,

        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        !isDrag && (
        <div ref={drag} onClick={() => toggleModal(item)} >
            <img alt={name} src={image} />
            <div className={styles.price_wrapper}>
                <span className={styles.price}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={styles.name}>{name}</h3>
            {count > 0 && (
                <Counter count={count} size="default" />
            )}
        </div>
        )
    )
}

// Проверка типов пропсов
Ingredient.propTypes = {
    item: PropTypes.object.isRequired
}