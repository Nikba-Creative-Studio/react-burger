import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../login/login.module.css';

import { registerUser } from '../../services/actions/auth';

export const Register = () => {

    const dispatch = useDispatch();

    const [nameValue, setNameValue] = useState('')
    const [nameEmail, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    
    const inputRef = useRef(null)
    const inputEmailRef = useRef(null)
    
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const body = {
        name: nameValue,
        email: nameEmail,
        password: passwordValue
    }

    const onSubmit = (body) => {
        //console.log(body)
        dispatch(registerUser(body))
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
                <h3 className={styles.title}>Регистрация</h3>
                
                <div className={styles.input}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setNameValue(e.target.value)}
                        value={nameValue}
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
                            type={'email'}
                            placeholder={'Email'}
                            onChange={e => setEmailValue(e.target.value)}
                            value={nameEmail}
                            name={'name'}
                            error={false}
                            ref={inputEmailRef}
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
                        Зарегистрироваться
                    </Button>
                </div>

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