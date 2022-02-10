import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { 
    removeIngredient,
} from '../../../services/actions/burger-constructor';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';

export const Ingredient = ({ item, type, isLocked }) => {

    const dispatch = useDispatch();

    //Експериментальная функция для удаления ингредиентов (Проверка работаспособности totalPrice)
    const removeItem = (id) => {
        dispatch(removeIngredient(id))
    }

    return (
        item &&
            <div className={styles.ingredients_item}>
                {!isLocked && <DragIcon />}
                <ConstructorElement
                    isLocked={isLocked}
                    type={type}
                    text={item.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => removeItem(item.uid)}
                />
            </div>
    )
}

// Проверка типов пропсов
Ingredient.propTypes = {
    item: PropTypes.object,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
}
