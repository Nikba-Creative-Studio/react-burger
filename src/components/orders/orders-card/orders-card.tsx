import { FC } from "react";
import { useAppSelector } from '../../../services/hooks'

import { Link, useLocation } from "react-router-dom";
import { IFeedCard } from "../../../types/feed";
import { TLocationState } from "../../../types/types";

import { OrderCardImages } from "../order-card-image/order-card-image";
import { OrderCardDate } from "../order-card-date/order-card-date";
import { OrderCardPrice } from "../order-card-price/order-card-price";
import { OrderCardStatus } from "../order-card-status/order-card-status";

import styles from "./orders-card.module.css";

export const OrderCard: FC<IFeedCard> = ({ time, name, ingredients, orderNumber, id, status = null, pageName }) => {
    
    const allIngredients = useAppSelector((state) => state.ingredients.ingredients);

    const location = useLocation<TLocationState>();

    const getIngredientsById = (id: string) => {
        return allIngredients.filter((ingredient: { _id: string; }) => ingredient._id === id);
    }

    const getIngredientsImages = (ingredients: string[]) => {
        return ingredients.map((ingredient: string) => {
            const ingredientData = getIngredientsById(ingredient);
            return ingredientData[0].image;
        });
    }

    const getInredientsPrice = (ingredients: string[]) => {
        return ingredients.map((ingredient: string) => {
            const ingredientData = getIngredientsById(ingredient);
            return ingredientData[0].price;
        });
    }

    const ingredientsImages = getIngredientsImages(ingredients);
    const ingredientsTotal = getInredientsPrice(ingredients).reduce((acc: number, price: number) => acc + price, 0);

    return (
        <Link 
            to={{ pathname: `/${pageName}/${id}`, state: { ordersModal: location } }}
            className={styles.link}
        >
            <div className={styles.cardHeader}>
                <span className={styles.id}>{'#' + orderNumber}</span>
                <OrderCardDate time={time} />
            </div>

            <h2 className={styles.name}>{name}</h2>

            {status && <OrderCardStatus status={status} />}
            
            <div className={styles.cardBody}>
                <div className={styles.cardBodyLeft}>
                    <ul className={styles.ingredientImages}>
                    {ingredientsImages.length > 0 && (
                        <OrderCardImages images={ingredientsImages} />
                    )}
                    </ul>
                </div>
                <div className={styles.cardBodyRight}>
                    <OrderCardPrice price={ingredientsTotal} />
                </div>
            </div>

            
        </Link>
    );
};