import { useState, useRef, FC } from 'react';
import { useSelector } from 'react-redux';

import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { Ingredient } from './ingredient/ingredient';
import { Loader } from '../loader/loader';

export const BurgerIngredients: FC = () => {


    // Загружаем ингредиенты из хранилища
    const ingredientsData = useSelector((state: any) => state.ingredients.ingredients);
    const isLoading = useSelector((state: any) => state.ingredients.isLoading);

    //Рефы для переключения вкладок
    const bunRef = useRef<HTMLLIElement>(null);
    const sauceRef = useRef<HTMLLIElement>(null);
    const mainRef = useRef<HTMLLIElement>(null);
    
    // Состояние вкладок
    const [current, setCurrent] = useState({
        type: 'bun',
        scrollTo: bunRef
    })

    // Типы ингредиентов
    const types = {
        bun: 'Булочка',
        sauce: 'Соус',
        main: 'Начинки'
    }

    if(isLoading) {
        return <Loader />
    }

    // Переключение вкладок
    const handleClick = (value) => {
        //console.log(value)
        setCurrent(value)
        value.scrollTo.current.scrollIntoView({ behavior: 'smooth' })
    }

    // Активируем таб при скролле
    // Для Код Ревювера - По мне это колхоз, буду признателен за помощь и предложения по улучшению кода. Спасибо!
    const handleScroll = (e) => {
        const scrollTop = e?.target?.scrollTop;

        const bunHeight: any = bunRef?.current?.clientHeight;
        const sauceHeight = sauceRef?.current?.clientHeight;
        const mainHeight = mainRef?.current?.clientHeight;

        if (scrollTop < bunHeight ) {
            setCurrent({
                type: 'bun',
                scrollTo: bunRef
            })
        }
        else if (scrollTop < bunHeight + sauceHeight ) {
            setCurrent({
                type: 'sauce',
                scrollTo: sauceRef
            })
        }
        else if (scrollTop < bunHeight + sauceHeight + mainHeight ) {
            setCurrent({
                type: 'main',
                scrollTo: mainRef
            })
        }
    }
    

    // Групируем ингредиенты по вкладкам
    const ingredients = (type: string) => {
        const currentType = ingredientsData.filter(item => item.type === type)

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
                        //value={{ type, scrollTo: type === 'bun' ? bunRef : type === 'sauce' ? sauceRef : mainRef }}
                        value={type}
                        key={type}
                        onClick={handleClick}
                        active={current.type === type}
                    >
                        {types[type]}
                    </Tab>
                ))}
            </div>

            <ul className={styles.ingredients} onScroll={handleScroll}>
                {Object.keys(types).map(type => (
                    ingredients(type)
                ))}
            </ul>

        </section>
    )
}