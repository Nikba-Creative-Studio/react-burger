import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../services/hooks'
import { wsUserRequest, wsConnectClose } from "../../services/actions/feed"

import { Profile } from "../../components/profile/profile";
import { IWsOrders } from "../../types/feed"
import { Loader } from "../../components/loader/loader"
import { OrderCard } from "../../components/orders/orders-card/orders-card"

import styles from "./orders.module.css";

export const Orders: FC = () => {

    const dispatch = useAppDispatch();

    const { orders } = useAppSelector((state) => state.feed);
    
    const sortedOrders = orders.sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    useEffect(() => {
        dispatch(wsUserRequest());
        return () => {
            dispatch(wsConnectClose());
        };
    }, [dispatch]);

    if (!orders.length) {
        return <Loader />
    }

    return (
        <div className={styles.wrapper}>

            <Profile />

            <main>
                <h1>История заказов</h1>

                <div className={styles.feedWrapper}>
                    {sortedOrders.length &&
                        sortedOrders.map((item: IWsOrders) => (
                            <OrderCard
                                key={item._id}
                                id={item._id}
                                time={item.createdAt}
                                name={item.name}
                                status={item.status}
                                orderNumber={item.number}
                                ingredients={item.ingredients}
                                pageName={'profile/orders'}
                            />
                        ))}
                </div>

            </main>
        </div>
    )
} 