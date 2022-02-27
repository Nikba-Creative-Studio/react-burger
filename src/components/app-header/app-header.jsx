import styles from "./app-header.module.css";
import { NavLink } from 'react-router-dom';

import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.nav_list}>
                        <li className={styles.nav_item}>
                            <NavLink
                                to="/"
                                className={styles.nav_link}
                                activeClassName={styles['nav_link--active']}
                                exact={true}
                            >
                                <BurgerIcon type="primary" />
                                Конструктор
                            </NavLink>
                        </li>
                        
                        <li className={styles.nav_item}>
                            <NavLink
                                to="/orders"
                                className={styles.nav_link}
                                activeClassName={styles['nav_link--active']}
                                exact={true}
                            >
                                <ListIcon type="primary" />
                                Лента заказов
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className={styles.logo_wrapper}>
                    <NavLink
                        to="/"
                        className={styles.logo}
                        exact={true}
                    >
                        <Logo />
                    </NavLink>
                </div>

                <div className={styles.profile_wrapper}>
                    <NavLink
                        to="/profile"
                        className={styles.nav_link}
                        activeClassName={styles['nav_link--active']}
                        exact={true}
                    >
                        <ProfileIcon type="primary" />
                        Личный кабинет
                    </NavLink>
                </div>
            </div>

        </header>
    )
}
