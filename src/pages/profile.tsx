import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import {NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { logoutUser } from "../components/services/logout-user-slice";
import { useEffect } from "react";
import { authUser } from "../components/services/get-user-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";


const Profile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {access} = useAppSelector(store => store.refreshTokenSlice);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(logoutUser());
        navigate('/login');
    }

    useEffect(() => {
        dispatch(authUser());
    }, [access]);


    const { pathname } = useLocation();
    const isProfile = pathname === '/profile' ? true : false;

    return (
        <div className={classNames(styles.profileContainer)}>
            <div className={styles.profileContent}>
                <div className={classNames(styles.navContainer, 'pt-10')}>
                    <NavLink to="/profile" className={classNames(styles.navElement)}>
                        {({ isActive }) => (
                            <p className={`text text_type_main-medium pb-8 ${isActive && isProfile ? '' : 'text_color_inactive'}`}>Профиль</p>
                        )}
                    </NavLink>
                    <NavLink to="/profile/orders" className={classNames(styles.navElement)}>
                        {({ isActive }) => (
                            <p className={`text text_type_main-medium pb-8 ${isActive ? '' : 'text_color_inactive'}`}>История заказов</p>
                        )}
                    </NavLink>
                    <div>
                        <Button htmlType="button" type="secondary" size="large" extraClass={classNames(styles.logout)} onClick={handleLogout}>
                            <p className="text text_type_main-medium text_color_inactive">Выход</p>
                        </Button>
                    </div>
                    <p className="text text_type_main-small text_color_inactive pt-30">В этом разделе вы можете изменить свои персональные данные</p>
                </div>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default Profile;