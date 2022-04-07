import { useAppSelector } from '../../../services/hooks'
import image from '../../../images/checkmark.gif'
import  styles from './order-details.module.css'

import { TOrderDetailsProps } from '../../../types/types'

export const OrderDetails = () => {
    
    // Загружаем данные из хранилища
    const { order }: TOrderDetailsProps = useAppSelector((state: any) => state.orderDetails);
    
    return (
        <div className={styles.order_details}>
            <h2 className={styles.number}>{order.order.number}</h2>
            <p className={styles.title}>идентификатор заказа</p>
            <img src={image} alt="✓" className={styles.image} />
            <p className={styles.status}>Ваш заказ начали готовить</p>
            <p className={styles.alert}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

