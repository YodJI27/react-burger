
import { Tab, BurgerIcon, MenuIcon, ProfileIcon, Logo, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./appHeader.module.css";
import classNames from 'classnames';

const AppHeader = () => {
    return (
        <header className={styles.header}>
          <nav className={classNames(styles.appContainer, 'pt-4 pb-4')}>
            <div className={styles.navContainer}>
                <button className={classNames(styles.buttonHeader, 'pl-1 pr-5 pb-4 pt-4')}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </button>
                <button className={classNames(styles.buttonHeader, 'pl-5 pr-5 pb-4 pt-4')}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default ml-2 text_color_inactive">Лента заказов</p>
                </button>
            </div>
            <div className='mr-30'><Logo /></div>
            <button className={classNames(styles.buttonHeader, 'pl-5 pr-5 pb-4 pt-4')}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default ml-2 text_color_inactive">Личный кабинет</p>
            </button>
          </nav>
        </header>
    )
}


export default AppHeader;