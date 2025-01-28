import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";


const Profile = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={classNames(styles.profileContent, 'pt-30')}>
                <div className={classNames(styles.navContainer, 'pt-10')}>
                    <NavLink to="/profile" className={classNames(styles.navElement)}>
                        <p className="text text_type_main-medium pb-8">Профиль</p>
                    </NavLink>
                    <NavLink to="/profile/orders" className={classNames(styles.navElement)}>
                        <p className="text text_type_main-medium pb-8 text_color_inactive">История заказов</p>
                    </NavLink>
                    <Button htmlType="button" type="secondary" size="large" extraClass={classNames(styles.logout)}>
                        <p className="text text_type_main-medium text_color_inactive">Выход</p>
                    </Button>
                    <p className="text text_type_main-small text_color_inactive pt-30">В этом разделе вы можете изменить свои персональные данные</p>
                </div>
                <div className="pt-5 pl-20">
                    <Input placeholder="Имя" extraClass="pb-6" />
                    <EmailInput placeholder="Логин" extraClass="pb-6"/>
                    <PasswordInput placeholder="Пароль"/>
                </div>
            </div>
        </div>
    )
}


export default Profile;