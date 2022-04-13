import { FC } from 'react';
import { useAppSelector } from '../../../services/hooks'
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';

import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { TLocationState, TIngredientProps } from '../../../types/types';

export const Ingredient: FC<TIngredientProps> = ({ item }) => {
    
    const location = useLocation<TLocationState>();
    
    const { image, price, name } = item;
    
    // Загружаем данные из хранилища
    const { ingredients, buns }= useAppSelector((state) => state.constructorIngredients);

    // Количество ингредиента в конструкторе
    const count = (item.type === 'bun') 
            ? (buns && buns._id === item._id)
            ? 1
            : 0
            : ingredients.filter((ingredient: { _id: string; }) => ingredient._id === item._id).length
    
    // Перемещаем ингредиент в конструктор
    const [, drag] = useDrag({
        type: "ingredients",
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <Link 
            to={{ pathname: `/ingredients/${item._id}`, state: { ingredientModal: location } }}
            className={styles.ingredient}
            ref={drag} 
            data-test={item._id}
            >
                <img alt={name} src={image} />
                <div className={styles.price_wrapper}>
                    <span className={styles.price}>{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className={styles.name}>{name}</h3>
                {count > 0 && (
                    <Counter count={count} size="default" />
                )}
        </Link>
    )
}