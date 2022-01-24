import PropTypes from 'prop-types'
import image from '../../../images/done.png'
import  styles from './order-details.module.css'
import { Modal } from '../../modal/modal'

export const OrderDetails = ({ ...props }) => {

    const { onClose } = props;

    return (
        <Modal
            onClose={onClose}
            title=""
        >
            <div className={styles.order_details}>
                <h2 className={styles.number}>123456</h2>
                <p className={styles.title}>идентификатор заказа</p>
                <img src={image} alt="✓" className={styles.image} />
                <p className={styles.status}>Ваш заказ начали готовить</p>
                <p className={styles.alert}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
}

// Проверка типов пропсов
OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
}