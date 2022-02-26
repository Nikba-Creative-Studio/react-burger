import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css';

export const NotFound404 = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}></div>
            <h1>Ой! 404 Ошибка</h1>
            <p>Запрашиваемая вами страница не существует</p>
            <p>Проверьте адрес или попробуйте <Link to='/' className={styles.link}>главная страница</Link></p>
        </div>
    )
}
