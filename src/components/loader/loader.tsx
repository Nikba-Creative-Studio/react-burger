import { FC } from 'react';
import styles from './loader.module.css'

export const Loader: FC = () => { 
    return (
        <div className={styles.loader}>
            <div className={styles.loader__spinner}></div>
        </div>
    )
}