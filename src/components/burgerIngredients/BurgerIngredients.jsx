import styles from "./BurgerIngredients.module.css";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import BurgerIngredientsCard from "../burgerCard/BurgerIngredientsCard";
import PropTypes from "prop-types";

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = useState('breads');
    const [breads, setBreads] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [fillings, setFillings] = useState([]);

    const breadsRef = useRef(null);
    const saucesRef = useRef(null);
    const fillingsRef = useRef(null);

    const scrollToSections = (ref) => {
        if(ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    useEffect(() => {

        const filteredBreadsArray = data?.filter(obj => obj.type === 'bun');
        setBreads(filteredBreadsArray);

        const filteredSaucesArray = data?.filter(obj => obj.type === 'sauce');
        setSauces(filteredSaucesArray);

        const filteredFillingsArray = data?.filter(obj => obj.type === 'main');
        setFillings(filteredFillingsArray);

    }, [data]);

    return (
        <div className={classNames(styles.burgerContainer, 'pt-10 pb-10')}>
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <nav className={styles.buttonContainer}>
                <Tab value='breads' active={current === 'breads'} onClick={() => {setCurrent('breads'), scrollToSections(breadsRef)}}>Булки</Tab>
                <Tab value='sauces' active={current === 'sauces'} onClick={() => {setCurrent('sauces'), scrollToSections(saucesRef)}}>Соусы</Tab>
                <Tab value='fillings' active={current === 'fillings'} onClick={() => {setCurrent('fillings'), scrollToSections(fillingsRef)}}>Начинки</Tab>
            </nav>
            <div className={classNames(styles.listContainer, 'pt-10 custom_scroll')}>
                <div className={styles.listRow}>
                    <p ref={breadsRef} className="text text_type_main-medium">Булки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {breads?.map((item) => (
                            <div key={item._id}>
                                <BurgerIngredientsCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={saucesRef} className="text text_type_main-medium">Соусы</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {sauces?.map((item) => (
                            <div key={item._id}>
                                <BurgerIngredientsCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={fillingsRef} className="text text_type_main-medium">Начинки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {fillings?.map((item) => (
                            <div key={item._id}>
                                <BurgerIngredientsCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            image_large: PropTypes.string,
            image_mobile: PropTypes.string,
            price: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired
        })
    )
}


export default BurgerIngredients;