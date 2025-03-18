import styles from './burgerIngredientsCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
// import { IingredientPropTypes } from '../../../utils/IngredientType';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { RootState } from '../../main';
import { IIngredientPropTypes } from '../../../utils/IngredientType';
import { useAppSelector } from '../../hooks/hooks';

interface ICardProps {
    ingredient: IIngredientPropTypes,
    openModal: Function
}


const BurgerIngredientsCard: FC<ICardProps> = ({ingredient, openModal}) => {

    const location = useLocation();

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });

    const { bun, constructor } = useAppSelector(store => store.constructorSlice);

    const checkCountIng = constructor.filter((el: any) => el._id == ingredient._id);

    return (
        <Link key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{background: location}} className={styles.link}>
            <div className={styles.cardBurger} ref={dragRef} onClick={e => openModal(ingredient)}>
                <img src={ingredient.image} alt={ingredient.name} className='pr-4 pl-4'/>
                <div className={classNames(styles.price, 'pt-1 pb-1')}>
                    <p className="text text_type_main-medium pr-1">{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={classNames(styles.text, "text text_type_main-default")}>{ingredient.name}</p>
                {/* @ts-ignore */}
                {(checkCountIng.length != 0 || bun?._id == ingredient._id) && <Counter count={ingredient.type === 'bun' ? bun?._id == ingredient._id ? 2 : 0 : checkCountIng.length} size="default" extraClass="m-1" />}
            </div>
        </Link>
    )
}

export default BurgerIngredientsCard;
