import { useState, FC } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../login/login.module.css';

import { resetPassword } from '../../services/actions/auth';

import { TAuth, TProfile } from '../../types/types';

export const ResetPassword: FC = () => {

    const dispatch = useAppDispatch()

    type TLogin = Pick<TProfile, 'token' | 'password'>

    const [input, setInput] = useState<TLogin>({
        password: '',
        token: '',
    })

    const { isLogin, resetPasswordSuccess, resetPasswordError, forgotPasswordSuccess }: TAuth = useAppSelector((state: any) => state.auth)

    // Отправка формы
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPassword(input))
    }

    if(isLogin) {
        return <Redirect to={'/'} />
    }

    if(resetPasswordSuccess) {
        return (
            <Redirect to='/login' />
        )
    }

    if(!forgotPasswordSuccess) {
        return (
            <Redirect to='/forgot-password' />
        )
    }

    return (
        <div className={styles.wrapper}>
            <form 
                className={styles.form}
                onSubmit={onSubmit}
            >
                <h3 className={styles.title}>Восстановление пароля</h3>

                <div className={styles.input}>
                    <PasswordInput
                        onChange={e => setInput({...input, [e.target.name]: e.target.value})}
                        value={input.password} 
                        name={'password'}
                    />
                </div>

                <div className={styles.input}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setInput({...input, [e.target.name]: e.target.value})}
                        value={input.token}
                        name={'token'}
                        error={false}
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

                {resetPasswordError && <p className={styles.error}>Предоставлены неверные учетные данные</p>}

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