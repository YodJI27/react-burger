import styles from './BurgerIngredientsCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/IngredientType';


const BurgerIngredientsCard = ({ingredient}) => {

    return (
        <div className={styles.cardBurger}>
            <img src={ingredient.image} alt="ингредиент" className='pr-4 pl-4'/>
            <div className={classNames(styles.price, 'pt-1 pb-1')}>
                <p className="text text_type_main-medium pr-1">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={classNames(styles.text, "text text_type_main-default")}>{ingredient.name}</p>
            <Counter count={1} size="default" extraClass="m-1" />
        </div>
    )
}

BurgerIngredientsCard.propTypes = {
    ingredient: ingredientPropTypes
}

export default BurgerIngredientsCard;
