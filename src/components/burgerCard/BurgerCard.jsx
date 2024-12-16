import styles from './BurgerCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';


const BurgerCard = (props) => {

    return (
        <div className={styles.cardBurger}>
            <img src={props.image} alt="ингридиент" className='pr-4 pl-4'/>
            <div className={classNames(styles.price, 'pt-1 pb-1')}>
                <p className="text text_type_main-medium pr-1">{props.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={classNames(styles.text, "text text_type_main-default")}>{props.name}</p>
            <Counter count={1} size="default" extraClass="m-1" />
        </div>
    )
}

export default BurgerCard;