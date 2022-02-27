import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../login/login.module.css';

import { forgotPassword } from '../../services/actions/auth';

export const ForgotPassword = () => {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        email: '',
    })

    const { isLogin, forgotPasswordSuccess, forgotPasswordError } = useSelector(state => state.auth)

    // Ставим значение форм в стате
    const onChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    // Отправка формы
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(input.email))
    }

    if(isLogin) {
        return <Redirect to={'/'} />
    }

    if(forgotPasswordSuccess) {
        return (
            <Redirect to='/reset-password' />
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
                    <Input
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            onChange={onChange}
                            value={input.email}
                            name={'email'}
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
                        Восстановить
                    </Button>
                </div>

                {forgotPasswordError && <p className={styles.error}>Ошибка восстановления пароля</p>}

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