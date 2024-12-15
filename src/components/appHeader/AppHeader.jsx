
import { Tab, BurgerIcon, MenuIcon, ProfileIcon, Logo, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./AppHeader.module.css";
import classNames from 'classnames';

const AppHeader = () => {
    return (
        <nav className={classNames(styles.appContainer, 'pt-4 pb-4')}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <button className={classNames(styles.buttonHeader, 'pl-5 pr-5 pb-4 pt-4')}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </button>
                <button className={classNames(styles.buttonHeader, 'pl-5 pr-5 pb-4 pt-4')}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default ml-2" style={{color: '#8585AD'}}>Лента заказов</p>
                </button>
            </div>
            <Logo />
            <button className={classNames(styles.buttonHeader, 'pl-5 pr-5 pb-4 pt-4')}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default ml-2" style={{color: '#8585AD'}}>Личный кабинет</p>
            </button>
        </nav>
    )
}


export default AppHeader;