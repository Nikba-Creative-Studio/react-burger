import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from './ingredient/ingredient';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';

export const BurgerIngredients = ({ ingredientsData }) => {

    const [current, setCurrent] = useState('bun')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})

    const toggleModal = (ingredientData) => {
        setIsModalOpen(!isModalOpen)
        setModalData(ingredientData)
    }


    return (
        <section className={styles.ingredients_container}>
            <h2 className={styles.title}>Соберите бургер</h2>

            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sause" active={current === 'sause'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <ul className={styles.ingredients}>
                <li className={styles.ingredients_collection}>
                    <h2 className={styles.ingredients_title}>Булки</h2>
                    <ul className={styles.ingredients_list}>
                        {ingredientsData.map((item) => item.type === 'bun' &&
                            <li key={item._id} onClick={() => toggleModal(item)} className={styles.ingredient}>
                                <Ingredient {...item} />
                            </li>)}
                    </ul>
                </li>

                <li className={styles.ingredients_collection}>
                    <h2 className={styles.ingredients_title}>Соусы</h2>
                    <ul className={styles.ingredients_list}>
                        {ingredientsData.map((item) => item.type === 'sauce' &&
                            <li key={item._id} onClick={() => toggleModal(item)} className={styles.ingredient}>
                                <Ingredient {...item} />
                            </li>)}
                    </ul>
                </li>

                <li className={styles.ingredients_collection}>
                    <h2 className={styles.ingredients_title}>Начинки</h2>
                    <ul className={styles.ingredients_list}>
                        {ingredientsData.map((item) => item.type === 'main' &&
                            <li key={item._id} onClick={() => toggleModal(item)} className={styles.ingredient}>
                                <Ingredient {...item} />
                            </li>)}
                    </ul>
                </li>

            </ul>

            {isModalOpen && (
                <Modal
                    onClose={toggleModal}
                    title="Детали ингредиента"
                >
                    <IngredientDetails data={modalData} />
                </Modal>
            )}

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