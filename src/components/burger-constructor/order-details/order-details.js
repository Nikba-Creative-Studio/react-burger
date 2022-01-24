import PropTypes from 'prop-types'

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
                <h2>123456</h2>
                <p>идентификатор заказа</p>
                <p>Ваш заказ начали готовить</p>
                <p>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
}

// Проверка типов пропсов
OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
}