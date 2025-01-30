import styles from "./burgerIngredients.module.css";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import BurgerIngredientsCard from "../burgerCard/BurgerIngredientsCard";
import Modal from "../Modals/Modal";
import IngredientDetails from "../Modals/IngredientsDetails";
import { useDispatch, useSelector } from "react-redux";
import { setIngredientsDetails, setOpenModalIngredients } from "../services/ingredient-details";

const BurgerIngredients = () => {

    const ingredients = useSelector(store => store.ingredientsSlice.ingredients);
    const openModalIng = useSelector(store => store.ingredientsDetailsSlice.open);

    const [current, setCurrent] = useState('breads');
    const [breads, setBreads] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [fillings, setFillings] = useState([]);
    const blockRef = useRef(null);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('breads');

    const breadsRef = useRef(null);
    const saucesRef = useRef(null);
    const fillingsRef = useRef(null);

    const handleScrollBlock = (e) => {

        setCurrent(null)

        const scrollTop = e.srcElement.scrollTop;
        let checker = 'breads';

        const breadsPosition = breadsRef.current.getBoundingClientRect().y;
        const saucesPosition = saucesRef.current.getBoundingClientRect().y;
        const fillingsPosition = fillingsRef.current.getBoundingClientRect().y;

        if(scrollTop > breadsPosition) checker = 'breads';
        if(scrollTop > saucesPosition) checker = 'sauces';
        if(scrollTop > fillingsPosition) checker = 'fillings';

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
        dispatch(setIngredientsDetails(ingredient));
        dispatch(setOpenModalIngredients(true));
    }

    const handleCloseModal = () => {
        dispatch(setOpenModalIngredients(false));
    }


    return (
        <div className={classNames(styles.burgerContainer, 'pt-10 pb-10')}>
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <nav className={styles.buttonContainer}>
                <Tab value='breads' active={activeTab == 'breads' || current == 'breads'} onClick={() => {setCurrent('breads'), scrollToSections(breadsRef)}}>Булки</Tab>
                <Tab value='sauces' active={activeTab == 'sauces' || current == 'sauces'} onClick={() => {setCurrent('sauces'), scrollToSections(saucesRef)}}>Соусы</Tab>
                <Tab value='fillings' active={activeTab ==  'fillings' || current == 'fillings'} onClick={() => {setCurrent('fillings'), scrollToSections(fillingsRef)}}>Начинки</Tab>
            </nav>
            <div className={classNames(styles.listContainer, 'pt-10 custom_scroll')} ref={blockRef}>
                <div className={styles.listRow}>
                    <p ref={breadsRef} className="nav_title text text_type_main-medium">Булки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {breads?.map((ingredient) => (
                            <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} openModal={handleOpenModal} />
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={saucesRef} className="nav_title text text_type_main-medium">Соусы</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {sauces?.map((ingredient) => (
                            <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} openModal={handleOpenModal}/>
                        ))}
                    </div>
                </div>
                <div className={styles.listRow}>
                    <p ref={fillingsRef} className="nav_title text text_type_main-medium">Начинки</p>
                    <div className={classNames(styles.listCard, 'pt-6 pb-10')}>
                        {fillings?.map((ingredient) => (
                            <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} openModal={handleOpenModal}/>
                        ))}
                    </div>
                </div>
            </div>
            {openModalIng && <Modal title='Детали ингредиента' onClose={handleCloseModal}><IngredientDetails /></Modal>}
        </div>
    )
};


export default BurgerIngredients;
