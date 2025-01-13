import styles from "./burgerIngredients.module.css";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import BurgerIngredientsCard from "../BurgerCard/BurgerIngredientsCard";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/IngredientType";
import Modal from "../Modals/Modal";
import IngredientDetails from "../Modals/IngredientsDetails";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {

    const ingredients = useSelector(store => store.ingredientsSlice.ingredients);

    const [current, setCurrent] = useState('breads');
    const [breads, setBreads] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [fillings, setFillings] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState(null);
    const blockRef = useRef(null);
    const [activeTab, setActiveTab] = useState(1);

    const breadsRef = useRef(null);
    const saucesRef = useRef(null);
    const fillingsRef = useRef(null);

    const handleScrollBlock = (e) => {

        setCurrent(null)

        const scrollTop = e.srcElement.scrollTop;
        let checker = 1;

        if(scrollTop > breadsRef.current.getBoundingClientRect().y) checker = 1;
        if(scrollTop > saucesRef.current.getBoundingClientRect().y) checker = 2;
        if(scrollTop > fillingsRef.current.getBoundingClientRect().y) checker = 3;

        setActiveTab(checker)
    }

    useEffect(() => {
        const block = blockRef.current;

        block.addEventListener('scroll', handleScrollBlock);

        return () => {
            block.removeEventListener('scroll', handleScrollBlock);
        }
    }, [])

    const scrollToSections = (ref) => {

        if(ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    useEffect(() => {

        const filteredBreadsArray = ingredients?.filter(obj => obj.type === 'bun');
        setBreads(filteredBreadsArray);

        const filteredSaucesArray = ingredients?.filter(obj => obj.type === 'sauce');
        setSauces(filteredSaucesArray);

        const filteredFillingsArray = ingredients?.filter(obj => obj.type === 'main');
        setFillings(filteredFillingsArray);

    }, [ingredients]);

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
                <Tab value='breads' active={activeTab === 1 || current == 'breads'} onClick={() => {setCurrent('breads'), scrollToSections(breadsRef)}}>Булки</Tab>
                <Tab value='sauces' active={activeTab === 2 || current == 'sauces'} onClick={() => {setCurrent('sauces'), scrollToSections(saucesRef)}}>Соусы</Tab>
                <Tab value='fillings' active={activeTab === 3 || current == 'fillings'} onClick={() => {setCurrent('fillings'), scrollToSections(fillingsRef)}}>Начинки</Tab>
            </nav>
            <div className={classNames(styles.listContainer, 'pt-10 custom_scroll')} ref={blockRef}>
                <div className={styles.listRow}>
                    <p ref={breadsRef} className="nav_title text text_type_main-medium">Булки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {breads?.map((ingredient) => (
                            <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} />
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={saucesRef} className="nav_title text text_type_main-medium">Соусы</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {sauces?.map((ingredient) => (
                            <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} />
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={fillingsRef} className="nav_title text text_type_main-medium">Начинки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {fillings?.map((ingredient) => (
                            <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} />
                        ))}
                    </div>
                </div>
            </div>
            {openModal && <Modal title='Детали ингредиента' onClose={handleCloseModal}><IngredientDetails data={dataModal} /></Modal>}
        </div>
    )
};

// BurgerIngredients.propTypes = {
//     data: PropTypes.arrayOf(ingredientPropTypes).isRequired
// }


export default BurgerIngredients;
