import { useState, useRef, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';

import { loginUser } from '../../services/actions/auth';

import { TLocationState, TProfile, TAuth } from '../../types';

export const Login: FC = () => {

    const dispatch = useDispatch()
    const location = useLocation<TLocationState>()
    const inputRef = useRef(null)

    type TLogin = Pick<TProfile, 'email' | 'password'>

    const [input, setInput] = useState<TLogin>({
        email: '',
        password: ''
    })

    const { isLogin, loginError, resetPasswordSuccess }: TAuth = useSelector((state: any) => state.auth)
    
    // Перенаправление на страницу после авторизации
    if(isLogin) {
        return <Redirect to={ location?.state?.from || '/' } />
    }

    // Отправка формы
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                            onChange={e => setInput({...input, [e.target.name]: e.target.value})}
                            value={input.email}
                            name={'email'}
                            error={false}
                            ref={inputRef}
                            icon={'ProfileIcon'}
                            errorText={'Ошибка'}
                            size={'default'}
                    />
                </div>

                <div className={styles.input}>
                    <PasswordInput
                        onChange={e => setInput({...input, [e.target.name]: e.target.value})}
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
                {resetPasswordSuccess && <div className={styles.success}>Пароль успешно обновлен, теперь вы можете войти</div>}

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