import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../login/login.module.css';

export const ResetPassword = () => {

    const [valuePass, setValuePass] = useState('')
    const [valueCode, setValueCode] = useState('')
    const [switchIcon, setSwitchIcon] = useState(true)

    const inputRef = useRef(null)
    const inputRefCode = useRef(null)

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        inputRef.current.type = switchIcon ? 'text' : 'password'
        setSwitchIcon(!switchIcon)
    }

    const onIconClickCode = () => {
        setTimeout(() => inputRefCode.current.focus(), 0)
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h3 className={styles.title}>Восстановление пароля</h3>

                <div className={styles.input}>
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setValuePass(e.target.value)}
                        value={valuePass}
                        icon={switchIcon ? 'ShowIcon' : 'HideIcon'}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={styles.input}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setValueCode(e.target.value)}
                        value={valueCode}
                        name={'name'}
                        error={false}
                        ref={inputRefCode}
                        onIconClick={onIconClickCode}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={styles.button}>
                    <Button
                        type="primary"
                        size="large"
                    >
                        Сохранить
                    </Button>
                </div>

                <div className={styles.text}>
                    <p className={styles.label}>Вспомнили пароль?</p>
                    <Link
                        to='/login'
                        className={styles.link}
                    >
                        Войти
                    </Link>
                </div>

            </form>
        </div>
    )
}