import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { wsConnectRequest, wsConnectClose } from "../../services/actions/feed"
import { FeedCard } from "../../components/feed/feed-card/feed-card"
import { IWsOrders, IFeedCardStatus } from "../../types/feed"
import { Loader } from "../../components/loader/loader"

import styles from "./feed.module.css"

export const Feed: FC = () => {

    const dispatch = useDispatch();

    const { total, totalToday, orders } = useSelector((state: any) => state.feed);
    

    useEffect(() => {
        dispatch(wsConnectRequest());
        return () => {
            dispatch(wsConnectClose());
        };
    }, [dispatch]);

    const ordersNumbers = (orders: IWsOrders[], orderStatus: IFeedCardStatus): number[] => {
        const sortedOrders = orders.filter((item) => item.status === orderStatus);
        return sortedOrders.map((item) => item.number).slice(0, 10);
    };

    if (!orders.length) {
        return <Loader />
    }


    return (
        <div className={styles.wrapper}>
            
            <div className={styles.feed}>
                <h1 className={styles.title}>Лента заказов</h1>
                <div className={styles.feedWrapper}> 
                    {orders.length &&
                        orders.map((item: IWsOrders) => (
                            <FeedCard
                                key={item._id}
                                id={item._id}
                                time={item.createdAt}
                                name={item.name}
                                orderNumber={item.number}
                                ingredients={item.ingredients}
                                pageName={'feed'}
                            />
                        ))}
                </div>
            </div>

            <div className={styles.feedInfo}>

                <div className={styles.feedInfoStatusWrapper}>
                    <div className={styles.feedInfoStatus}>
                        <div className={styles.feedInfoStatusItemTitle}>Готовы</div>
                        <ul className={styles.feedInfoStatusList}>
                        {ordersNumbers(orders, 'done').length ? (
                            ordersNumbers(orders, 'done').map((item) => (
                                <li key={item} className={styles.feedInfoStatusItem}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li>Пока нет готовых бургеров</li>
                        )}
                        </ul>
                    </div>

                    <div className={styles.feedInfoStatus}>
                        <div className={styles.feedInfoStatusItemTitle}>В работе</div>
                        <ul>
                        {ordersNumbers(orders, 'pending').length ? (
                            ordersNumbers(orders, 'pending').map((item) => (
                                <li key={item} className={styles.feedInfoStatusItem}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li>Все заказы Готовы</li>
                        )}
                        </ul>
                    </div>
                </div>

                <div className={styles.orderTotalContainer}>
                    <h3 className={styles.orderTotalTitle}>Выполнено за все время</h3>
                    <p className={styles.orderTotal}>{total}</p>
                </div>

                <div className={styles.orderTotalContainer}>
                    <h3 className={styles.orderTotalTitle}>Выполнено за сегодня</h3>
                    <p className={styles.orderTotal}>{totalToday}</p>
                </div>
            </div>

        </div>
    )
}