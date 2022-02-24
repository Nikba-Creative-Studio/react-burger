import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';

export const Login = () => {

    const [nameEmail, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    
    const inputRef = useRef(null)
    
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h3 className={styles.title}>Вход</h3>
                
                <div className={styles.input}>
                    <Input
                            type={'email'}
                            placeholder={'Email'}
                            onChange={e => setEmailValue(e.target.value)}
                            value={nameEmail}
                            name={'name'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                    />
                </div>

                <div className={styles.input}>
                    <PasswordInput
                        onChange={e => setPasswordValue(e.target.value)}
                        value={passwordValue} 
                        name={'password'}
                    />
                </div>

                <div className={styles.button}>
                    <Button 
                        type="primary" 
                        size="large"
                    >
                        Войти
                    </Button>
                </div>

                <div className={styles.text}>
                    <p className={styles.label}>Вы — новый пользователь?</p>
                    <Link 
                        to='/register'
                        className={styles.link}
                    >
                        Зарегистрироваться
                    </Link>
                </div>

                <div className={styles.text}>
                    <p className={styles.label}>Забыли пароль?</p>
                    <Link 
                        to='/forgot-password'
                        className={styles.link}
                    >
                        Восстановить пароль
                    </Link>
                </div>

            </form>
        </div>
    )
}