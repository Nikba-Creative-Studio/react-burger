import { useSelector } from 'react-redux';
import styles from './feed-details.module.css';
import { orderStatus, formatDate } from '../../../utils/helpers'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredientData } from '../../../types/types';

export const FeedDetails = ({ item } ) => {

    const status = orderStatus(item.status);
    const date = formatDate(item.createdAt);

    const allIngredients = useSelector((state: any) => state.ingredients.ingredients);

    const getIngredientsById = (id: string) => {
        return allIngredients.filter((ingredient: { _id: string; }) => ingredient._id === id);
    }

    const getIngredients = (ingredients: string[]) => {
        return ingredients.map((ingredient: string) => {
            const ingredientData = getIngredientsById(ingredient);
            return ingredientData[0];
        });
    }


    const getGroupIngredients = function (acc: (TIngredientData | undefined)[]) {
        return acc.reduce<{ key: string, ingredients: TIngredientData[] }[]>(
            (data, item) => {
                if (item) {
                    const group = data.find(k => k.key === item._id);
                    if (group) {
                        group.ingredients.push(item);
                    }
                    else {
                        data.push({ key: item._id, ingredients: [item] })
                    }
                }
                return data;
            }, []
        )
    }

    const items = getGroupIngredients(getIngredients(item.ingredients))

    const getInredientsPrice = (ingredients: string[]) => {
        return ingredients.map((ingredient: string) => {
            const ingredientData = getIngredientsById(ingredient);
            return ingredientData[0].price;
        });
    }
    
    const ingredientsTotal = getInredientsPrice(item.ingredients).reduce((acc: number, price: number) => acc + price, 0);
    
    return (
        <div className={styles.feedDetails}>
            <span className={styles.feeDetails__number}>
               #{item.number}
            </span>

            <div className={styles.feedDetails__title}>
                {item.name}
            </div>

            <span className={status.color}>{status.statusText}</span>

            <h4 className={styles.feedDetails__subTitle}>Состав:</h4>

            <div className={styles.feedDetails__list}>

                {items.map((ingredient: any) => (
                    <div className={styles.feedDetails__item} key={ingredient.key}>
                        <div className={styles.ingredientImage}>
                            <div className={styles.imageWrapper}>
                                <img
                                    className={styles.image}
                                    src={ingredient.ingredients[0].image}
                                    alt={ingredient.ingredients[0].name}
                                />
                            </div>
                        </div>

                        <div className={styles.feedDetails__item__name}>
                            {ingredient.ingredients[0].name}
                        </div>

                        <div className={styles.feedDetails__item__count}>
                            <span className={styles.count}>
                                {ingredient.ingredients.length} 
                            </span>
                            x 
                            <span className={styles.price}>
                                {ingredient.ingredients[0].price}
                                <CurrencyIcon type="primary" />
                            </span>
                        </div>

                        
                    </div>
                ))}
            </div>

            <div className={styles.feedDetails__footer}>
                <time className={styles.time}>{date}</time>
                <span className={styles.price}>
                {ingredientsTotal}
                    <CurrencyIcon type="primary" />
                </span>
            </div>

        </div>
    )
}