import styles from "./BurgerIngredients.module.css";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import BurgerCard from "../burgerCard/BurgerCard";

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = useState('breads');
    const [breads, setBreads] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [fillings, setFillings] = useState([]);

    useEffect(() => {

        const filteredBreadsArray = data?.filter(obj => obj.type === 'bun');
        setBreads(filteredBreadsArray);

        const filteredSaucesArray = data?.filter(obj => obj.type === 'sauce');
        setSauces(filteredSaucesArray);

        const filteredFillingsArray = data?.filter(obj => obj.type === 'main');
        setFillings(filteredFillingsArray);

    }, [data]);

    return (
        <div className={classNames(styles.burgerContainer, 'pt-10 pr-10')}>
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <nav className={styles.buttonContainer}>
                <Tab value='breads' active={current === 'breads'} onClick={setCurrent}>Булки</Tab>
                <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value='fillings' active={current === 'fillings'} onClick={setCurrent}>Начинки</Tab>
            </nav>
            <div className={classNames(styles.listContainer, 'pt-10')}>
                <div className={styles.listRow}>
                    <p className="text text_type_main-medium">Булки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {breads?.map((item) => (
                            <div key={item._id}>
                                <BurgerCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p className="text text_type_main-medium">Соусы</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {sauces?.map((item) => (
                            <div key={item._id}>
                                <BurgerCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p className="text text_type_main-medium">Начинки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {fillings?.map((item) => (
                            <div key={item._id}>
                                <BurgerCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BurgerIngredients;