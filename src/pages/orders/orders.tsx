import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wsUserRequest, wsConnectClose } from "../../services/actions/feed"
import styles from "./orders.module.css";
import { Profile } from "../../components/profile/profile";
import { IWsOrders, IFeedCardStatus } from "../../types/feed"
import { Loader } from "../../components/loader/loader"
import { FeedCard } from "../../components/feed/feed-card/feed-card"


export const Orders: FC = () => {

    const dispatch = useDispatch();

    const { orders } = useSelector((state: any) => state.feed);

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
                    {orders.length &&
                        orders.map((item: IWsOrders) => (
                            <FeedCard
                                key={item._id}
                                id={item._id}
                                time={item.createdAt}
                                name={item.name}
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