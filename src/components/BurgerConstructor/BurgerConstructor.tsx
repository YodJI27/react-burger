
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css"
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import OrderDetails from "../Modals/OrderDetails";
import { useDrop } from "react-dnd";
import { setBunIngredients, setClearData, setConstructor, setDragConstructor } from "../services/constructor";
import BurgerConstructorSliceCard from "../BurgerConstructorSliceCard/BurgerConstructorSliceCard";
import { createOrder } from "../services/order";
import { checkUserAuth } from "../services/get-user-slice";
import {useNavigate } from "react-router-dom";
import { setPriceBunTotal, setPriceClear, setPriceIngTotal } from "../services/ingredients";
import { IIngredientPropTypes } from "../../../utils/IngredientType";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";


const BurgerConstructor = () => {

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const bun = useAppSelector(store => store.constructorSlice.bun);
    const constructor = useAppSelector(store => store.constructorSlice.constructor);
    const priceIngTotal = useAppSelector(store => store.ingredientsSlice.priceIngTotal);
    const priceBunTotal = useAppSelector(store => store.ingredientsSlice.priceBunTotal);
    const {userAccess} = useAppSelector(store => store.loginUserSlice);

    const dispatch = useAppDispatch();

    const handleOpenModal = () => {

        if(!userAccess) {
            navigate('/login');
        } else {
            const checkIdIng = constructor?.map((item: any) => item._id);
            //@ts-ignore
            dispatch(createOrder({ingredients: [bun._id, ...checkIdIng, bun._id]}));
            dispatch(setClearData());
            dispatch(setPriceClear());
            setOpenModal(true);
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const [{isHover}, dropTarget]: any = useDrop<IIngredientPropTypes>({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            if(item.type === 'bun') {
                dispatch(setBunIngredients(item));
                dispatch(setPriceBunTotal(item.price * 2));
            } else {
                dispatch(setConstructor(item));
                dispatch(setPriceIngTotal(priceIngTotal + item.price));
            }
        }
    });

    const borderHover = isHover ? styles.hoverBorder : '';

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(setDragConstructor({first: dragIndex, second: hoverIndex}));
      }, [dispatch])


    return (
        <section className={classNames(styles.burgerContainerDrop, 'pt-25 pl-4 pr-4 pb-10')} ref={dropTarget}>
            {bun ? <div className="pl-8">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    // @ts-ignore
                    text={bun.name}
                    // @ts-ignore
                    price={bun.price}
                    // @ts-ignore
                    thumbnail={bun.image}
                />
            </div> : <div className={classNames(styles.burger, borderHover)} style={{borderRadius: 'var(--top-constructor-item-border-radius)'}}>Добавьте булку</div>}
            <div className={classNames(styles.listIngredients, 'pt-4 custom_scroll')}>
                {constructor?.map((item, index) => (
                    <BurgerConstructorSliceCard key={index} item={item} indexIng={index} moveCard={moveCard} />
                ))}
                {constructor.length === 0 ? <div className={classNames(styles.burger, borderHover)}>Добавьте ингридиент</div> : null}
            </div>
            {bun ? <div className="pl-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    // @ts-ignore
                    text={bun.name}
                    // @ts-ignore
                    price={bun.price}
                    // @ts-ignore
                    thumbnail={bun.image}
                />
            </div> : <div className={classNames(styles.burger, borderHover)} style={{borderRadius: 'var(--bottom-constructor-item-border-radius)'}}>Добавьте булку</div>}
            <div className={classNames(styles.buttonOrder, 'pt-10 pr-5')}>
                <div className={classNames(styles.priceContainer, 'pr-10')}>
                    <p className="text text_type_main-large pr-2">{priceBunTotal + priceIngTotal}</p>
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