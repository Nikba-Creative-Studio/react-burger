import { useContext } from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { ConstructorContext } from '../../../services/constructorContext';

export const Ingredient = ({ image, price, name, _id }) => {

    // Читаем данные из контекста
    const { constructor } = useContext(ConstructorContext);
    
    return (
        <div data-id={_id}>
            <img alt={name} src={image} />
            <div className={styles.price_wrapper}>
                <span className={styles.price}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={styles.name}>{name}</h3>
            <Counter 
                count={constructor.filter(e => e._id === _id).length}
                size="default" />
        </div>
    )
}

// Проверка типов пропсов
Ingredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
}