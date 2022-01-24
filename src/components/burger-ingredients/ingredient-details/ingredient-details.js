import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css'
import { Modal } from '../../modal/modal';

export const IngredientDetails = ({ ...props }) => {

    const { name, calories, proteins, fat, carbohydrates, image } = props.data;
    const { onClose } = props;

    return (
        <Modal
            onClose={onClose}
            title="Детали ингредиента"
        >
            <div className={styles.ingredient_details}>
                <img src={image} alt={name} />
                <h3>{name}</h3>
                <ul>
                    <li>Калории,ккал <span>{calories}</span></li>
                    <li>Белки, г <span>{proteins}</span></li>
                    <li>Жиры, г <span>{fat}</span></li>
                    <li>Углеводы, г <span>{carbohydrates}</span></li>
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
        image: PropTypes.string.isRequired
    })
}