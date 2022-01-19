import React from 'react';
import styles from "./app-header.module.css";

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
                            <a className={styles['nav_link--active']} href="/">
                                <BurgerIcon type="primary" />
                                <span className="ml-2">Конструктор</span>
                            </a>
                        </li>
                        
                        <li className={styles.nav_item}>
                            <a className={styles.nav_link} href="/">
                                <ListIcon type="secondary" />
                                <span className="ml-2">Лента заказов</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className={styles.logo_wrapper}>
                    <a className={styles.logo} href="/">
                        <Logo />
                    </a>
                </div>

                <div className={styles.profile_wrapper}>
                    <a className={styles.nav_link} href="/">
                        <ProfileIcon type="secondary" />
                        <span className="ml-2">Личный кабинет</span>
                    </a>
                </div>
            </div>

        </header>
    )
}
