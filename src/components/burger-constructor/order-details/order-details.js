import PropTypes from 'prop-types';

import image from '../../../images/done.png'
import  styles from './order-details.module.css'

export const OrderDetails = ({ data }) => {
    //console.log(data)
    const { number } = data.order;

    return (
        <div className={styles.order_details}>
            <h2 className={styles.number}>{number}</h2>
            <p className={styles.title}>идентификатор заказа</p>
            <img src={image} alt="✓" className={styles.image} />
            <p className={styles.status}>Ваш заказ начали готовить</p>
            <p className={styles.alert}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

// Проверка типов пропсов
OrderDetails.propTypes = {
    data: PropTypes.object.isRequired
}
