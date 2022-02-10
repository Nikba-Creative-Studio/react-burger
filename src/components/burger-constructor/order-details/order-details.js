import { useSelector } from 'react-redux';
import image from '../../../images/done.png'
import  styles from './order-details.module.css'

export const OrderDetails = () => {
    
    const data = useSelector(state => state.orderDetails.order);
    
    return (
        <div className={styles.order_details}>
            <h2 className={styles.number}>{data.order.number}</h2>
            <p className={styles.title}>идентификатор заказа</p>
            <img src={image} alt="✓" className={styles.image} />
            <p className={styles.status}>Ваш заказ начали готовить</p>
            <p className={styles.alert}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

