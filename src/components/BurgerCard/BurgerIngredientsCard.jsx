import styles from './burgerIngredientsCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { ingredientPropTypes } from '../../../utils/IngredientType';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredientsDetails } from '../services/ingredientDetails';


const BurgerIngredientsCard = ({ingredient, openModal}) => {

    const dispatch = useDispatch();

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });

    const { bun, constructor }  = useSelector(store => store.constructorSlice);

    const checkCountIng = constructor.filter(el => el._id == ingredient._id);

    return (
        <div className={styles.cardBurger} ref={dragRef} onClick={e => openModal(ingredient)}>
            <img src={ingredient.image} alt={ingredient.name} className='pr-4 pl-4'/>
            <div className={classNames(styles.price, 'pt-1 pb-1')}>
                <p className="text text_type_main-medium pr-1">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={classNames(styles.text, "text text_type_main-default")}>{ingredient.name}</p>
            {(checkCountIng != 0 || bun?._id == ingredient._id) && <Counter count={ingredient.type === 'bun' ? bun?._id == ingredient._id ? 2 : 0 : checkCountIng.length} size="default" extraClass="m-1" />}
        </div>
    )
}

BurgerIngredientsCard.propTypes = {
    ingredient: ingredientPropTypes
}

export default BurgerIngredientsCard;
