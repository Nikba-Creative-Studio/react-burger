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

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const loginError = useSelector(state => state.auth.loginError)
    const isLogin = useSelector(state => state.auth.isLogin);
    
    // Перенаправление на страницу после авторизации
    if(isLogin) {
        return <Redirect to={ location?.state?.from || '/' } />
    }
    
    // 
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    // Ставим значение форм в стате
    const onChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    // Отправка формы
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(input))
    }

    return (
        <div className={styles.wrapper}>
            <form 
                className={styles.form}
                onSubmit={onSubmit}
            >
                <h3 className={styles.title}>Вход</h3>
                
                <div className={styles.input}>
                    <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={onChange}
                            value={input.email}
                            name={'email'}
                            error={false}
                            ref={inputRef}
                            icon={'ProfileIcon'}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                    />
                </div>

                <div className={styles.input}>
                    <PasswordInput
                        onChange={onChange}
                        value={input.password} 
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