import { useRef, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './profile.module.css';

import { editUser, userLogout } from '../../services/actions/auth';

export const ProfilePage = () => {

    const dispatch = useDispatch();

    const inputNameRef = useRef(null)
    const inputEmailRef = useRef(null)
    const inputPasswordRef = useRef(null)

    const { editError, editData, userInfo } = useSelector(state => state.auth)

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [inputEdit, setInputEdit] = useState(false)

    useEffect(() => {
        if(userInfo) {
            setInput({
                name: userInfo.user.user.name,
                email:userInfo.user.user.email,
                password: ''
            })
        }
    }, [userInfo])

    // Ставим значение форм в стате
    const onChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    // Отмена редактирования
    const onCancel = () => {
        setInputEdit(false)
    }

    // Отправка формы
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(editUser(input))
    }

    // Выход из профиля
    const onLogout = () => {
        dispatch(userLogout())
    }

    return (
        <div className={styles.wrapper}>
            <aside className={styles.nav}>
                <NavLink 
                    to="/profile" 
                    exact={true} 
                    className={styles.link}
                    activeClassName={styles.active}
                >
                    Профиль
                </NavLink>

                <NavLink 
                    to="/profile/orders" 
                    className={styles.link}
                    activeClassName={styles.active}
                >
                    История заказов
                </NavLink>
                <Button
                    onClick={onLogout}
                    type="primary" 
                    size="small"
                >
                    Выход
                </Button>
            </aside>
            <main>
                <form onSubmit={onSubmit}>
                    <div className={styles.input}>
                        <Input
                            ref={inputNameRef}
                            name={'name'}
                            placeholder={'Имя'}
                            size={'default'}
                            value={input.name}
                            icon={'EditIcon'}
                            onChange={onChange}
                            onFocus={e => setInputEdit(true)}
                        />
                    </div>

                    <div className={styles.input}>
                        <Input
                            ref={inputEmailRef}
                            name={'email'}
                            type={'email'}
                            placeholder={'E-mail'}
                            size={'default'}
                            value={input.email}
                            icon={'EditIcon'}
                            onChange={onChange}
                            onFocus={e => setInputEdit(true)}

                        />
                    </div>

                    <div className={styles.input}>
                        <Input
                            ref={inputPasswordRef}
                            name={'password'}
                            placeholder={'Введите новый пароль'}
                            size={'default'}
                            value={input.password}
                            icon={'EditIcon'}
                            onChange={onChange}
                            onFocus={e => setInputEdit(true)}

                        />
                    </div>

                    {inputEdit &&
                        <div className={styles.input}>
                            <Button 
                                type="secondary" 
                                size="medium"
                                onClick={onCancel}
                            >
                                Отмена
                            </Button>
                            <Button type="primary" size="medium" >
                                Сохранить
                            </Button>
                        </div>
                    }

                    {editError &&   <div className={styles.error}>Ошибка изменения данных</div>}
                    {editData &&   <div className={styles.success}>Данные успешно изменены</div>}

                </form>
            </main>
        </div>
    )
}