import styles from "./burgerIngredients.module.css";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import BurgerIngredientsCard from "../burgerCard/BurgerIngredientsCard";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/IngredientType";
import Modal from "../Modals/Modal";
import IngredientDetails from "../modals/ingredientsDetails";

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = useState('breads');
    const [breads, setBreads] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [fillings, setFillings] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState(null);

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

    const handleOpenModal = (ingredient) => {
        setOpenModal(true);
        setDataModal(ingredient);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setDataModal(null);
    }


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
                        {breads?.map((ingredient) => (
                            <div key={ingredient._id} onClick={() => handleOpenModal(ingredient)}>
                                <BurgerIngredientsCard ingredient={ingredient} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={saucesRef} className="text text_type_main-medium">Соусы</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {sauces?.map((ingredient) => (
                            <div key={ingredient._id} onClick={() => handleOpenModal(ingredient)}>
                                <BurgerIngredientsCard ingredient={ingredient} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={fillingsRef} className="text text_type_main-medium">Начинки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {fillings?.map((ingredient) => (
                            <div key={ingredient._id} onClick={() => handleOpenModal(ingredient)}>
                                <BurgerIngredientsCard ingredient={ingredient} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {openModal && <Modal title='Детали ингредиента' onClose={handleCloseModal}><IngredientDetails data={dataModal} /></Modal>}
        </div>
    )
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes).isRequired
}


export default BurgerIngredients;
