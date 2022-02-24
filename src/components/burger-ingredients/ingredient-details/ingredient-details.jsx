import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css'

export const IngredientDetails = () => { 

    const { name, calories, proteins, fat, carbohydrates, image_large } = useSelector(state => state.ingredients.ingredient);

    return (
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
    )
}

