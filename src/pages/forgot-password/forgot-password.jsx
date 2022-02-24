import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../login/login.module.css';

export const ForgotPassword = () => {

    const [valueEmail, setValueEmail] = useState('')
    
    const inputRef = useRef(null)
    
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h3 className={styles.title}>Восстановление пароля</h3>
                
                <div className={styles.input}>
                    <Input
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            onChange={e => setValueEmail(e.target.value)}
                            value={valueEmail}
                            name={'name'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                </div>

                <div className={styles.button}>
                    <Button 
                        type="primary" 
                        size="large"
                    >
                        Восстановить
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