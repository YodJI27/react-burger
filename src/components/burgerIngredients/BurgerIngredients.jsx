import styles from "./BurgerIngredients.module.css";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = useState('breads');

    return (
        <div className={classNames(styles.burgerContainer, 'pt-10 pr-10')}>
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <nav className={styles.buttonContainer}>
                <Tab value='breads' active={current === 'breads'} onClick={setCurrent}>Булки</Tab>
                <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value='fillings' active={current === 'fillings'} onClick={setCurrent}>Начинки</Tab>
            </nav>
            <section className={styles.listContainer}>

            </section>
        </div>
    )
}


export default BurgerIngredients;