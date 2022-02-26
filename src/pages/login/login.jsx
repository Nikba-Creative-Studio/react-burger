import { useState, useRef } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';

import { loginUser } from '../../services/actions/auth';

export const Login = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const inputRef = useRef(null)

    const [nameEmail, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const loginError = useSelector(state => state.auth.loginError)
    const isLogin = useSelector(state => state.auth.isLogin);
    
    if(isLogin) {
        return <Redirect to={ location?.state?.from || '/' } />
    }
    
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const body = {
        email: nameEmail,
        password: passwordValue
    }

    const onSubmit = (body) => {
        dispatch(loginUser(body))
    }

    return (
        <div className={styles.wrapper}>
            <form 
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(body)
                }}
            >
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

                {loginError && <div className={styles.error}>Неверный email или пароль</div>}

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