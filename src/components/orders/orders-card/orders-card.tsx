import { FC, useEffect, useMemo } from "react";
import { useAppSelector } from '../../../services/hooks'

import { Link, useLocation } from "react-router-dom";
import { IFeedCard } from "../../../types/feed";
import { TLocationState } from "../../../types/types";

import { OrderCardImages } from "../order-card-image/order-card-image";
import { OrderCardDate } from "../order-card-date/order-card-date";
import { OrderCardPrice } from "../order-card-price/order-card-price";
import { OrderCardStatus } from "../order-card-status/order-card-status";

import { fetchIngredients } from "../../../services/actions/burger-ingredients";
import { useAppDispatch } from "../../../services/hooks";

import styles from "./orders-card.module.css";

export const OrderCard: FC<IFeedCard> = ({ time, name, ingredients, orderNumber, id, status = null, pageName }) => {

    const allIngredients = useAppSelector((state) => state.ingredients.ingredients);

    const location = useLocation<TLocationState>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if ((!allIngredients || allIngredients.length <= 0)) {
            dispatch(fetchIngredients());
        }
    }, [allIngredients, dispatch]);

    const getIngredientsById = useMemo(() => {
        return allIngredients?.filter(ingredient => {
            return ingredients?.includes(ingredient._id)
        });
    }, [allIngredients, ingredients]);

    const getInredientsPrice = useMemo(() => {
        let sum = 0;

        if (getIngredientsById) {
            getIngredientsById.map((item) => {
                if (item.type === 'bun') {
                    return sum += item.price * 2;

                } else {
                    return sum += item.price;
                }
            });
        }
        return sum;
    }, [getIngredientsById]);

    const getIngredientsImages = useMemo(() => {
        return getIngredientsById?.map(item => {
            return item.image;
        });
    }, [getIngredientsById]);

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

                        {getIngredientsImages.length > 0 && (
                            <OrderCardImages images={getIngredientsImages} />
                        )}

                    </ul>
                </div>
                <div className={styles.cardBodyRight}>
                    <OrderCardPrice price={getInredientsPrice} />
                </div>
            </div>
        </Link>
    );
};