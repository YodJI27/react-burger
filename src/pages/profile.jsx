import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../components/services/logout-user-slice";
import { useEffect, useState } from "react";
import { authUser } from "../components/services/get-user-slice";
import { refreshToken } from "../components/services/refresh-token-slice";
import { patchUser } from "../components/services/patch-user-slice";


const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {name, email, message, loading} = useSelector((store) => store.getUserSlice);
    const {access} = useSelector((store) => store.refreshTokenSlice);
    const [nameUser, setNameUser] = useState('');
    const [loginUser, setLoginUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [isChange, setIsChange] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(logoutUser());
        navigate('/login');
    }

    useEffect(() => {
        dispatch(authUser());
    }, [access]);

    useEffect(() => {
        if(message == 'jwt expired') {
            dispatch(refreshToken());
        }
    }, [message]);

    useEffect(() => {
        setNameUser(name);
        setLoginUser(email);
    }, [name, email]);

    useEffect(() => {
        if(name !== nameUser || email !== loginUser || passwordUser !== '') {
            setIsChange(true)
        } else {
            setIsChange(false)
        }
    }, [nameUser, passwordUser, loginUser])


    const handleChangeName = (e) => {
        setIsChange(true);
        setNameUser(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setIsChange(true);
        setLoginUser(e.target.value)
    }

    const handleChangePassword = (e) => {
        setIsChange(true);
        setPasswordUser(e.target.value)
    }

    const handleCancel = () => {
        setNameUser(name);
        setPasswordUser('');
        setLoginUser(email);
    }

    const handleSubmitUser = (e) => {
        e.preventDefault();
        dispatch(patchUser({name: nameUser, email: loginUser, password: passwordUser}));
        setIsChange(false);
    }

    const { pathname } = useLocation();
    const isProfile = pathname === '/profile' ? true : false;

    return (
        <div className={classNames(styles.profileContainer, 'pt-30')}>
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
                <form className="pt-5 pl-20" onSubmit={handleSubmitUser}>
                    <div>
                        <Input icon='EditIcon' value={loading ? nameUser : "Загрузка..."} onChange={handleChangeName} placeholder={"Имя"} extraClass="pb-6" />
                        <EmailInput icon='EditIcon' value={loading ? loginUser : "Загрузка..."} onChange={handleChangeEmail} placeholder={"Логин"} extraClass="pb-6"/>
                        <PasswordInput value={passwordUser} onChange={handleChangePassword} placeholder={"Пароль"}/>
                    </div>
                    {isChange &&
                        <div className='flex pt-20'>
                            <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">
                                Сохранить
                            </Button>
                            <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={handleCancel}>
                                Отмена
                            </Button>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}


export default Profile;