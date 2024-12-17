
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png';
import styles from "./BurgerConstructor.module.css"
import classNames from "classnames";
import PropTypes from "prop-types";

const BurgerConstructor = ({data}) => {

    return (
        <div className={classNames(styles.burgerContainer, 'pt-25 pl-4 pr-4 pb-10')}>
            <div className="pl-8">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <div className={classNames(styles.listIngredients, 'pt-4')}>
                {data?.map((item) => (
                    <div key={item?._id} className={classNames(styles.ingredientsCard, 'pb-4')}>
                        <DragIcon type="primary" className="pr-2" />
                        <ConstructorElement
                            text={item?.name}
                            price={item?.price}
                            thumbnail={item?.image}
                        />
                    </div>
                ))}
            </div>
            <div className="pl-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <div className={classNames(styles.buttonOrder, 'pt-10 pr-5')}>
                <div className={classNames(styles.priceContainer, 'pr-10')}>
                    <p className="text text_type_main-large pr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

BurgerConstructor.propTypes = {
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


export default BurgerConstructor;