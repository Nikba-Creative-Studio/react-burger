import { useState, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks'

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../login/login.module.css';

import { registerUser } from '../../services/actions/auth';

import { TLocationState, TAuth, TProfile } from '../../types/types';

export const Register: FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation<TLocationState>()

    type TInfo = Pick<TProfile, 'name' | 'email' | 'password'>

    const [input, setInput] = useState<TInfo>({
        name: '',
        email: '',
        password: ''
    })

    const { isLogin, registerError }: TAuth = useAppSelector((state) => state.auth)

    // Перенаправление на страницу после авторизации
    if(isLogin) {
        return <Redirect to={ location?.state?.from || '/' } />
    }

    // Отправка формы
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                        onChange={e => setInput({...input, [e.target.name]: e.target.value})}
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
                            onChange={e => setInput({...input, [e.target.name]: e.target.value})}
                            value={input.email}
                            name={'email'}
                            error={false}
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