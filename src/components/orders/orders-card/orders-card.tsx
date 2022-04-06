import { FC } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { IFeedCard } from "../../../types/feed";

import { orderStatus, formatDate } from "../../../utils/helpers";

import { OrderCardImages } from "./orders-card-image/orders-card-image";

import styles from "./orders-card.module.css";

export const OrderCard: FC<IFeedCard> = ({ time, name, ingredients, orderNumber, id, status, pageName }) => {
    
    const allIngredients = useSelector((state: any) => state.ingredients.ingredients);

    const location = useLocation();

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

    const date = formatDate(time);
    const statusData = orderStatus(status)
    
    return (
        <Link 
            to={{ pathname: `/${pageName}/${id}`, state: { ordersModal: location } }}
            className={styles.link}
        >
            <div className={styles.cardHeader}>
                <span className={styles.id}>{'#' + orderNumber}</span>
                <time className={styles.time}>{date}</time>
            </div>

            <h2 className={styles.name}>{name}</h2>

            <span className={statusData.color}>{statusData.statusText}</span>
            
            <div className={styles.cardBody}>
                <div className={styles.cardBodyLeft}>
                    <ul className={styles.ingredientImages}>
                    {ingredientsImages.length > 0 && (
                        <OrderCardImages images={ingredientsImages} />
                    )}
                    </ul>
                </div>
                <div className={styles.cardBodyRight}>
                    {ingredientsTotal}
                    <CurrencyIcon type="primary" />
                </div>
            </div>

            
        </Link>
    );
};