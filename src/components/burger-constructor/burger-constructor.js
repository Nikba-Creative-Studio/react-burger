import { useState } from 'react';
import { DragIcon, ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Modal } from '../modal/modal';

import PropTypes from 'prop-types';

export const BurgerConstructor = ({ constructData }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    // Функция для открытия модального окна
    const handleOrderClick = () => {
        //console.log('Клик по кнопке оформить заказ')
        setIsModalOpen(true)
    }

    // Функция для закрытия модального окна
    const onClose = () => {
        setIsModalOpen(false)
    }

    // Total Price
    const total = constructData.reduce((acc, cur) => acc + cur.price, 0)

    return (
        <section className={styles.constructor_container}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${constructData[0].name} (верх)`}
                price={constructData[0].price}
                thumbnail={constructData[0].image}
            />

            <ul className={styles.ingredients}>
                {constructData.map((ingredient, index) => index > 0 && index < constructData.length - 1 && (
                    <li key={index} className={styles.ingredients_item}>
                        <DragIcon />
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                        />
                    </li>
                )
                )}
            </ul>

            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${constructData[constructData.length - 1].name} (низ)`}
                price={constructData[constructData.length - 1].price}
                thumbnail={constructData[constructData.length - 1].image}
            />

            <div className={styles.constructor_footer}>
                <div className={styles.total_wrapper}>
                    <span className={styles.total}>{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button 
                    type="primary" 
                    size="medium"
                    onClick={handleOrderClick}
                >
                    Оформить заказ
                </Button>
            </div>

            <Modal
                isModalOpen={isModalOpen}
                onClose={onClose}
                title=""
            >
                Тест модального окна для заказа бургера
            </Modal>

        </section>
    )
}

// BurgerConstructor Props Typechecking With PropTypes
BurgerConstructor.propTypes = {
    constructData: PropTypes.arrayOf(PropTypes.shape({
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