import { IngredientDetails } from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import styles from './ingredients.module.css';

export const IngredientsPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Детали ингредиента</h2>
                <IngredientDetails />
            </div>
        </div>
    )
}