import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../login/login.module.css';

import { registerUser } from '../../services/actions/auth';

export const Register = () => {

    const dispatch = useDispatch();
    const location = useLocation()

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })

    const registerError = useSelector(state => state.auth.registerError);
    const isLogin = useSelector(state => state.auth.isLogin);

    // Перенаправление на страницу после авторизации
    if(isLogin) {
        return <Redirect to={ location?.state?.from || '/' } />
    }
    
    // Ставим значение форм в стате
    const onChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    // Отправка формы
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(input))
    }

    return (
        <div className={styles.wrapper}>
            <form 
                className={styles.form}
                onSubmit={onSubmit}
            >
                <h3 className={styles.title}>Регистрация</h3>
                
                <div className={styles.input}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        value={input.name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={styles.input}>
                    <Input
                            type={'email'}
                            placeholder={'Email'}
                            onChange={onChange}
                            value={input.email}
                            name={'email'}
                            error={false}
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
                        Зарегистрироваться
                    </Button>
                </div>

                {registerError && <div className={styles.error}>Ошибка регистрации.</div>}

                <div className={styles.text}>
                    <p className={styles.label}>Уже зарегистрированы?</p>
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