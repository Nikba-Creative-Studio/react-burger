import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

import styles from './modal.module.css';

import { ModalOverlay } from './modal-overlay/modal-overlay';

export const Modal = ( { ...props } ) => {

    const { isModalOpen, onClose, title, children } = props;

    const modalRef = useRef(null);

    // Фунцция для закрытия модального окна при нажатии на кнопку Esc
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            //console.log('Нажата кнопка Esc')
            onClose()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Функция для закрытия модального окна при нажатии вне окна
    const handleClick = useCallback((e) => {
        //if (e.target !== modalRef.current) {
        if (!modalRef.current.contains(e.target)) {
            //console.log(modalRef.current)
            //console.log(e.target)
            //console.log('Нажата кнопка за пределами модального окна')
            onClose()
        }

        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Создаем слушатель на закрытие модального окна по нажатию на кнопку Esc
        document.addEventListener('keydown', handleKeyDown);

        // Создаем слушатель на закрытие модального окна по нажатию на кнопку за пределами модального окна
        document.addEventListener('mousedown', handleClick);

        return () => {
            // Удаляем слушатель при открытии модального окна
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClick);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return createPortal(
        <div className={`${styles.container} ${isModalOpen && styles.active}`}>
            <ModalOverlay />
            <div className={styles.modal}>
                <div className={styles.modal_content} ref={modalRef} >
                    <div className={styles.modal_header}>
                        <h2 className={styles.title}>{title}</h2>
                        <span onClick={onClose} className={styles.close}>
                            <CloseIcon type='primary'/>
                        </span>
                    </div>
                    <div className={styles.modal_body}>
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('react-modals')
    );
}

// Проверка типов пропсов
Modal.prototype = {
    isModalOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
}


