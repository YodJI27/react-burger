
import { Tab, BurgerIcon, MenuIcon, ProfileIcon, Logo, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./appHeader.module.css";
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className={styles.header}>
          <nav className={classNames(styles.appContainer, 'pt-4 pb-4')}>
            <div className={styles.navContainer}>
                <NavLink to={"/"}  className={styles.navElement}>
                    {({ isActive }) => (
                        <div className={classNames(styles.buttonHeader, 'pl-1 pr-5 pb-4 pt-4')}>
                            <BurgerIcon type={isActive ? "primary" : "secondary"} />
                            <p className={`text text_type_main-default ml-2 ${isActive ? "" : "text_color_inactive"}`}>Конструктор</p>
                        </div>
                    )}
                </NavLink>
                
                <NavLink to={"/feed"} className={styles.navElement}>
                    {({ isActive }) => (
                        <div className={classNames(styles.buttonHeader, 'pl-5 pr-5 pb-4 pt-4')}>
                            <ListIcon type={isActive ? "primary" : "secondary"} />
                            <p className={`text text_type_main-default ml-2 ${isActive ? "" : "text_color_inactive"}`}>Лента заказов</p>
                        </div>
                    )}
                </NavLink>
            </div>
            <Link to={'/'}>
                <div className='mr-30'><Logo /></div>
            </Link>
            <NavLink to={'/profile'} className={styles.navElement}>
                {({ isActive }) => (
                    <div className={classNames(styles.buttonHeader, 'pl-5 pr-5 pb-4 pt-4')}>
                        <ProfileIcon type={isActive ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ml-2 ${isActive ? "" : "text_color_inactive"}`}>Личный кабинет</p>
                    </div>
                )}
            </NavLink>
          </nav>
        </header>
    )
}


export default AppHeader;
