import { useState, useRef, useCallback, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';

import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { Ingredient } from './ingredient/ingredient';
import { Loader } from '../loader/loader';

import { TIngrefientsTab } from '../../types/';

export const BurgerIngredients: FC = () => {

    // Загружаем ингредиенты из хранилища
    const ingredientsData = useSelector((state: any) => state.ingredients.ingredients);
    const isLoading = useSelector((state: any) => state.ingredients.isLoading);

    //Рефы для переключения вкладок
    const bunRef = useRef<HTMLLIElement>(null);
    const sauceRef = useRef<HTMLLIElement>(null);
    const mainRef = useRef<HTMLLIElement>(null);

    // Состояние вкладок
    const [current, setCurrent] = useState<TIngrefientsTab>({
        type: 'bun',
        scrollTo: bunRef
    })

    // Активируем таб при скрулле
    const handleScroll = useCallback((e: Event) => {
        const bun = bunRef?.current?.getBoundingClientRect();
        const sauce = sauceRef?.current?.getBoundingClientRect();
        const main = mainRef?.current?.getBoundingClientRect();
        const obj: { [key: string]: number } = {
            bun: bun?.y || 0,
            sauce: sauce?.y || 0,
            main: main?.y || 0
        };
        const key = Object.keys(obj).reduce((key: string, v: string) => Math.abs(obj[v]) <= Math.abs(obj[key]) ? v : key);
        
        setCurrent({
            type: key,
            scrollTo: key === 'bun' ? bunRef : key === 'sauce' ? sauceRef : mainRef
        })
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, [handleScroll]);

    // Переключение вкладок
    const handleClick = (e: string) => {
    
        setCurrent({
            type: e,
            scrollTo: e === 'bun' ? bunRef : e === 'sauce' ? sauceRef : mainRef
        })

        if (e === "bun") { bunRef?.current?.scrollIntoView({ behavior: 'smooth'}) };
        if (e === "sauce") { sauceRef?.current?.scrollIntoView({ behavior: 'smooth' }) };
        if (e === "main") { mainRef?.current?.scrollIntoView({ behavior: 'smooth'}) };
    };

    if (isLoading) {
        return <Loader />
    }

    // Типы ингредиентов
    const types = {
        bun: 'Булочка',
        sauce: 'Соус',
        main: 'Начинки'
    }

    // Групируем ингредиенты по вкладкам
    const ingredients = (type: string) => {
        const currentType = ingredientsData.filter((item: { type: string; }) => item.type === type)

        return (
            <li
                className={styles.ingredients_collection}
                key={type}
                ref={type === 'bun' ? bunRef : type === 'sauce' ? sauceRef : mainRef}
            >
                <h2 className={styles.ingredients_title}>{types[type]}</h2>
                <ul className={styles.ingredients_list}>
                    {currentType.map(item => (
                        <li
                            key={item._id}
                            className={styles.ingredient}
                        >
                            <Ingredient item={item} />
                        </li>
                    ))}
                </ul>
            </li>
        )
    }

    return (
        <section className={styles.ingredients_container}>
            <h2 className={styles.title}>Соберите бургер</h2>

            <div className={styles.tabs}>
                {Object.keys(types).map(type => (
                    <Tab
                        value={type}
                        key={type}
                        onClick={handleClick}
                        active={current.type === type}
                    >
                        {types[type]}
                    </Tab>
                ))}
            </div>

            <ul className={styles.ingredients}>
                {Object.keys(types).map(type => (
                    ingredients(type)
                ))}
            </ul>

        </section>
    )
}