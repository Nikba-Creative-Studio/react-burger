import { FC, useEffect, useMemo } from "react";
import { getFeed } from "../../services/actions/feed";
import { Loader } from "../../components/loader/loader";

import { useSelector, useDispatch } from "react-redux"
import { useParams} from "react-router-dom";
import { FeedDetails } from "../../components/feed/feed-details/feed-details";


type FeedParams = {
    id: string;
};

export const FeedItem: FC = () => {

    const dispatch = useDispatch();
    const params = useParams<FeedParams>();

    const { orders } = useSelector((state: any) => state.feed);

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
        <FeedDetails item={item} />
    )
}