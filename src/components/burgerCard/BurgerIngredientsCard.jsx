import styles from './BurgerIngredientsCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const BurgerIngredientsCard = (props) => {

    return (
        <div className={styles.cardBurger}>
            <img src={props.image} alt="ингредиент" className='pr-4 pl-4'/>
            <div className={classNames(styles.price, 'pt-1 pb-1')}>
                <p className="text text_type_main-medium pr-1">{props.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={classNames(styles.text, "text text_type_main-default")}>{props.name}</p>
            <Counter count={1} size="default" extraClass="m-1" />
        </div>
    )
}

BurgerIngredientsCard.propTypes = {
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
}

export default BurgerIngredientsCard;