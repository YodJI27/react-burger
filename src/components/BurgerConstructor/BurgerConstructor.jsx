
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png';
import styles from "./burgerConstructor.module.css"
import classNames from "classnames";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ingredientPropTypes } from "../../../utils/IngredientType";
import Modal from "../Modals/Modal";
import OrderDetails from "../Modals/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { setBunIngredients, setConstructor } from "../services/constructor";

const BurgerConstructor = () => {

    const [openModal, setOpenModal] = useState(false);

    const { bun, constructor }  = useSelector(store => store.constructorSlice);

    console.log(bun, constructor)

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        setOpenModal(true);
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
                dispatch(setBunIngredients(item))
            } else {
                dispatch(setConstructor(item))
            }
        }
    });

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
            </div> : <div>Добавьте булку</div>}
            <div className={classNames(styles.listIngredients, 'pt-4 custom_scroll')}>
                {constructor?.map((item) => (
                    <div key={item?._id} className={classNames(styles.ingredientsCard, 'pb-4')}>
                        <DragIcon type="primary" className="pr-2" />
                        <ConstructorElement
                            text={item?.name}
                            price={item?.price}
                            thumbnail={item?.image}
                        />
                    </div>
                ))}
                {constructor.length === 0 ? <p>Перетащите ингридиент</p> : null}
            </div>
            {bun ? <div className="pl-8">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div> : <div>Добавьте булку</div>}
            <div className={classNames(styles.buttonOrder, 'pt-10 pr-5')}>
                <div className={classNames(styles.priceContainer, 'pr-10')}>
                    <p className="text text_type_main-large pr-2">610</p>
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