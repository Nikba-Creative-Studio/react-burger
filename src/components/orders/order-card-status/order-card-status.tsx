import { FC } from "react";
import { orderStatus } from "../../../utils/helpers";
import { IFeedCardStatus } from "../../../types/feed";

export const OrderCardStatus: FC<{ status: IFeedCardStatus }> = ({ status }) => {
    const statusData = orderStatus(status);
    return (
        <span className={statusData.color}>{statusData.statusText}</span>
    );
};