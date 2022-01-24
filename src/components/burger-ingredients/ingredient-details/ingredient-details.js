import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css'
import { Modal } from '../../modal/modal';

export const IngredientDetails = ({ ...props }) => {

    const { name, calories, proteins, fat, carbohydrates, image_large } = props.data;
    const { onClose } = props;

    return (
        <Modal
            onClose={onClose}
            title="Детали ингредиента"
        >
            <div className={styles.ingredient_details}>
                <img className={styles.image} src={image_large} alt={name} />
                <h3 className={styles.name}>{name}</h3>
                <ul className={styles.details}>
                    <li className={styles.details_item}>Калории,ккал <span className={styles.details_item_value}>{calories}</span></li>
                    <li className={styles.details_item}>Белки, г <span className={styles.details_item_value}>{proteins}</span></li>
                    <li className={styles.details_item}>Жиры, г <span className={styles.details_item_value}>{fat}</span></li>
                    <li className={styles.details_item}>Углеводы, г <span className={styles.details_item_value}>{carbohydrates}</span></li>
                </ul>
            </div>
        </Modal>
    )
}

// Проверка типов пропсов
IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        image_large: PropTypes.string.isRequired
    })
}