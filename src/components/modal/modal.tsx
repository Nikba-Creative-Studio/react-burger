import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';
import { ModalOverlay } from './modal-overlay/modal-overlay';

import { TModalProps } from '../../types/types';

export const Modal = ( { ...props }:TModalProps ) => {

    const { onClose, title, children } = props;

    const modalRef = useRef<HTMLDivElement>(null);

    // Фунцция для закрытия модального окна при нажатии на кнопку Esc
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            //console.log('Нажата кнопка Esc')
            if (typeof onClose === 'function') {
                onClose()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Функция для закрытия модального окна при нажатии вне окна
    const handleClick = useCallback((e: MouseEvent) => {
        //if (e.target !== modalRef.current) {
        if (!modalRef?.current?.contains(e.target as Node)) {
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
        <>
            <ModalOverlay />
            <div className={styles.modal} data-test="modal">
                <div className={styles.modal_content} ref={modalRef} >
                    <div className={styles.modal_header}>
                        <h2 className={styles.title}>{title}</h2>
                        <span onClick={onClose} className={styles.close} data-test="modal-close">
                            <CloseIcon type='primary'/>
                        </span>
                    </div>
                    <div className={styles.modal_body}>
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('react-modals') as HTMLElement
    );
}
