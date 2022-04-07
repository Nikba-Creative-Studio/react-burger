import { useAppSelector } from '../../../services/hooks'
import image from '../../../images/checkmark.gif'
import  styles from './order-details.module.css'

export const OrderDetails = () => {
    
    // Загружаем данные из хранилища
    const { order } = useAppSelector((state) => state.orderDetails);
    
    return (
        <div className={styles.order_details}>
            <h2 className={styles.number}>{order}</h2>
            <p className={styles.title}>идентификатор заказа</p>
            <img src={image} alt="✓" className={styles.image} />
            <p className={styles.status}>Ваш заказ начали готовить</p>
            <p className={styles.alert}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

