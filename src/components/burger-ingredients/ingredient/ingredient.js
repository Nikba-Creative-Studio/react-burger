import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { selectIngredient } from '../../../services/actions/burger-ingredients';

import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const Ingredient = ({ item }) => {
    
    const dispatch = useDispatch();
    
    const { image, price, name } = item;
    
    // Загружаем данные из хранилища
    const constructorData = useSelector(state => state.constructorIngredients.ingredients);
    const constructorBunsData = useSelector(state => state.constructorIngredients.buns);

    // Количество ингредиента в конструкторе
    const count = (item.type === 'bun') 
            ? (constructorBunsData && constructorBunsData._id === item._id)
            ? 2
            : 0
            : constructorData.filter(ingredient => ingredient._id === item._id).length
    
    // Открываем модальное окно описание ингредиента
    const toggleModal = (item) => {
        dispatch(selectIngredient(item));
    }

    // Перемещаем ингредиент в конструктор
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