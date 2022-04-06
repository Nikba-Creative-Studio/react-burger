import styles from './orders-card-image.module.css';

export const OrderCardImages = ({ images }) => {
    return (
        <>
            {images.slice(0, 6).map((item, index) => {
                if (index < 5) {
                    return (
                        <li key={index} className={styles.ingredientImage}>
                            <div className={styles.imageWrapper}>
                                <img
                                    className={styles.image}
                                    src={item}
                                    alt="ingredient"
                                />
                            </div>
                        </li>
                    )
                }
                else {
                    return (
                        <li key={index} className={styles.ingredientImage}>
                            <div className={styles.imageWrapper}>
                                <img
                                    className={`${styles.image} ${styles.imageMore}`}
                                    src={item}
                                    alt="ingredient"
                                />
                            </div>
                            <span className={styles.more}>+{images.length - 5}</span>
                        </li>
                    )
                }
            })
        }
        </>
    )
}