import { FC, useEffect, useMemo } from "react";
import { getFeed } from "../../services/actions/feed";
import { Loader } from "../../components/loader/loader";
import { useAppSelector, useAppDispatch } from '../../services/hooks'
import { useParams} from "react-router-dom";
import { OrderDetails } from "../../components/orders/orders-details/orders-details";
import { FeedParams } from "../../types/feed";
import styles from "./orders-item.module.css";

export const OrdersItem: FC = () => {

    const dispatch = useAppDispatch();
    const params = useParams<FeedParams>();

    const { orders } = useAppSelector((state) => state.feed);

    useEffect(() => {
        dispatch(getFeed());
    }, [dispatch]);

    const item = useMemo(() => {
        return  orders?.filter((order: { _id: string; }) => {
            return order._id === params.id;
        })[0];
    }, [orders, params]);

    if(!orders.length) {
        return <Loader />
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <OrderDetails item={item} />
            </div>
        </div>
    )
}