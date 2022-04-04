import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';

import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { TLocationState, TIngredientProps } from '../../../types/types';

export const Ingredient = ({ item }: TIngredientProps) => {
    
    const location = useLocation<TLocationState>();
    
    const { image, price, name } = item;
    
    // Загружаем данные из хранилища
    const constructorData = useSelector((state: any) => state.constructorIngredients.ingredients);
    const constructorBunsData = useSelector((state: any) => state.constructorIngredients.buns);

    // Количество ингредиента в конструкторе
    const count = (item.type === 'bun') 
            ? (constructorBunsData && constructorBunsData._id === item._id)
            ? 1
            : 0
            : constructorData.filter((ingredient: { _id: string; }) => ingredient._id === item._id).length
    
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