import React from 'react';
import styles from './ingredient.module.css';

import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const Ingredient = ({ image, price, name, _id }) => {

    return (
        <li data-id={_id} className={styles.ingredient}>
            <img alt={name} src={image} />
            <div className={styles.price_wrapper}>
                <span className={styles.price}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={styles.name}>{name}</h3>
            <Counter count={1} size="default" />
        </li>
    )
}


// Ingredient Props Typechecking With PropTypes
Ingredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
}