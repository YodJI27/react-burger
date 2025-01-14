
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png';
import styles from "./burgerConstructor.module.css"
import classNames from "classnames";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { ingredientPropTypes } from "../../../utils/IngredientType";
import Modal from "../Modals/Modal";
import OrderDetails from "../Modals/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { setBunIngredients, setConstructor, setDeleteIngredient, setDragConstructor } from "../services/constructor";
import { setOrder } from "../services/order";
import BurgerConstructorSliceCard from "../BurgerConstructorSliceCard/BurgerConstructorSliceCard";

const URL_FOR_ORDER = 'https://norma.nomoreparties.space/api/orders';

const BurgerConstructor = () => {

    const [openModal, setOpenModal] = useState(false);
    const [priceIng, setPriceIng] = useState(0);
    const [priceBun, setPriceBun] = useState(0);

    const { bun, constructor }  = useSelector(store => store.constructorSlice);

    const dispatch = useDispatch();

    const handleOpenModal = () => {

        const checkIdIng = constructor?.map(item => item._id);

        fetch(URL_FOR_ORDER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ingredients: [bun._id, ...checkIdIng]})
        })
        .then(res => {
            console.log(res)
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка:`, res.status, res.statusText);
        })
        .then((data) => {
            dispatch(setOrder(data.order.number))
            setOpenModal(true);
        })
        .catch((err) => {
            console.log('Ошибка: ', err);
        })
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            if(item.type === 'bun') {
                dispatch(setBunIngredients(item));
                setPriceBun(item.price * 2);
            } else {
                dispatch(setConstructor(item));
                setPriceIng(priceIng + item.price);
            }
        }
    });

    const borderHover = isHover ? styles.hoverBorder : '';

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(setDragConstructor({first: dragIndex, second: hoverIndex}));
      }, [dispatch])


    return (
        <section className={classNames(styles.burgerContainer, 'pt-25 pl-4 pr-4 pb-10')} ref={dropTarget}>
            {bun ? <div className="pl-8">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div> : <div className={classNames(styles.burger, borderHover)} style={{borderRadius: 'var(--top-constructor-item-border-radius)'}}>Добавьте булку</div>}
            <div className={classNames(styles.listIngredients, 'pt-4 custom_scroll')}>
                {constructor?.map((item, index) => (
                    <BurgerConstructorSliceCard key={index} item={item} indexIng={index} checkPrice={setPriceIng} priceIng={priceIng} moveCard={moveCard} />
                ))}
                {constructor.length === 0 ? <div className={classNames(styles.burger, borderHover)}>Добавьте ингридиент</div> : null}
            </div>
            {bun ? <div className="pl-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div> : <div className={classNames(styles.burger, borderHover)} style={{borderRadius: 'var(--bottom-constructor-item-border-radius)'}}>Добавьте булку</div>}
            <div className={classNames(styles.buttonOrder, 'pt-10 pr-5')}>
                <div className={classNames(styles.priceContainer, 'pr-10')}>
                    <p className="text text_type_main-large pr-2">{priceIng + priceBun}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>
            {openModal && <Modal onClose={handleCloseModal}><OrderDetails /></Modal>}
        </section>
    )
}


export default BurgerConstructor;