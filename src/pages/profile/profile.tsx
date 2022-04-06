import { useRef, useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { editUser } from '../../services/actions/auth';
import { Profile } from '../../components/profile/profile';

import { TProfile } from '../../types/types';

export const ProfilePage: FC = () => {

    const dispatch = useDispatch();

    const { editError, editData, name, email }: TProfile = useSelector((state: any) => state.auth)

    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    type TInfo = Pick<TProfile, 'name' | 'email' | 'password'>

    const [input, setInput] = useState<TInfo>({
        name: '',
        email: '',
        password: ''
    })

    const [inputEdit, setInputEdit] = useState<boolean>(false)

    useEffect(() => {
        if(name && email) {
            setInput({
                name: name,
                email: email,
                password: ''
            })
        }
    }, [name, email])

    // Отмена редактирования
    const onCancel = () => {
        setInputEdit(false)
    }

    // Отправка формы
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editUser(input))
    }

    

    return (
        <div className={styles.wrapper}>
            
            <Profile />

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
                            onChange={e => setInput({...input, [e.target.name]: e.target.value})}
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
                            onChange={e => setInput({...input, [e.target.name]: e.target.value})}
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
                            onChange={e => setInput({...input, [e.target.name]: e.target.value})}
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