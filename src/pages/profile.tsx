import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../components/services/logout-user-slice";
import { FormEvent, useEffect, useState } from "react";
import { authUser } from "../components/services/get-user-slice";
import { refreshToken } from "../components/services/refresh-token-slice";
import { patchUser } from "../components/services/patch-user-slice";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";


const Profile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {name, email, message, loading} = useAppSelector(store => store.getUserSlice);
    const {access} = useAppSelector(store => store.refreshTokenSlice);
    const [isChange, setIsChange] = useState(false);
    const {values, handleChange, setValues} = useForm({email: email, password: '', name: name});

    useEffect(() => {
        if(loading) {
            setValues({ email: email, name: name, password: '' });
        }
    }, [loading]);


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
        if(name !== values.name || email !== values.email || values.password !== '') {
            setIsChange(true)
        } else {
            setIsChange(false)
        }
    }, [values.name, values.email, values.password])


    const handleCancel = () => {
        setValues({ email: email, password: '', name: name });
    }

    const handleSubmitUser = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        //@ts-ignore
        dispatch(patchUser(values));
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
                        <Input icon='EditIcon' name={'name'} value={loading ? values.name : "Загрузка..."} onChange={handleChange} placeholder={"Имя"} extraClass="pb-6" />
                        <EmailInput isIcon={true} name={'email'} value={loading ? values.email : "Загрузка..."} onChange={handleChange} placeholder={"Логин"} extraClass="pb-6"/>
                        <PasswordInput value={values.password} name={'password'} onChange={handleChange} placeholder={"Пароль"}/>
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