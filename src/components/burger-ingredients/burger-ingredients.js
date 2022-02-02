import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from './ingredient/ingredient';

export const BurgerIngredients = ({ ingredientsData, toggleModal }) => {

    //Рефы для переключения вкладок
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const [current, setCurrent] = useState({
        type: 'bun',
        scrollTo: bunRef
    })

    // Типы ингредиентов
    const types = {
        bun: 'Булочка',
        sauce: 'Соус',
        main: 'Начинки'
    }

    // Переключение вкладок
    const handleClick = (value) => {
        //console.log(value)
        setCurrent(value)
        value.scrollTo.current.scrollIntoView({ behavior: 'smooth' })
    }

    // Групируем ингредиенты по вкладкам
    const ingredients = (type) => {
        const currentType = ingredientsData.filter(item => item.type === type)

        return (
            <li 
                className={styles.ingredients_collection}
                key={type} 
                ref={type === 'bun' ? bunRef : type === 'sauce' ? sauceRef : mainRef}
            >
                <h2 className={styles.ingredients_title}>{types[type]}</h2>
                <ul className={styles.ingredients_list}>
                    {currentType.map(item => (
                        <li 
                            key={item._id} 
                            onClick={() => toggleModal(item)} 
                            className={styles.ingredient}
                        >
                            <Ingredient {...item} />
                        </li>
                    ))}
                </ul>
            </li>
        )
    }

    return (
        <section className={styles.ingredients_container}>
            <h2 className={styles.title}>Соберите бургер</h2>

            <div className={styles.tabs}>
                {Object.keys(types).map(type => (
                    <Tab
                        value={{ type, scrollTo: type === 'bun' ? bunRef : type === 'sauce' ? sauceRef : mainRef }}
                        key={type}
                        onClick={handleClick}
                        active={current.type === type}
                    >
                        {types[type]}
                    </Tab>
                ))}
            </div>

            <ul className={styles.ingredients}>
                {Object.keys(types).map(type => (
                    ingredients(type)
                ))}
            </ul>

        </section >
    )
}

// Проверка типов пропсов
BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number,
    })).isRequired,
};