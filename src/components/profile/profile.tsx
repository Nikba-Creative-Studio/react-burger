import { FC } from "react";
import styles from './profile.module.css';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { userLogout } from "../../services/actions/auth";



export const Profile : FC = () => {

    const dispatch = useDispatch();

    // Выход из профиля
const onLogout = () => {
    dispatch(userLogout())
}

    return (
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
    )
}