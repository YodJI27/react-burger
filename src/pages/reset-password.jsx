import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import classNames from 'classnames';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordPost } from "../components/services/reset-password-slice";
import { useForm } from "../hooks/useForm";


const ResetPassword = () => {

    const {values, handleChange} = useForm({password: '', token: ''});
    const dispatch = useDispatch();
    const {loading} = useSelector((store) => store.resetPasswordSlice);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(resetPasswordPost(values));
    }

    console.log(values)

    if(loading) {
        return <Navigate to="/login" />
    }


    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
                <PasswordInput value={values.password} name="password" onChange={handleChange} extraClass='pb-6' placeholder="Введите новый пароль" />
                <Input value={values.token} name="token" onChange={handleChange} extraClass='pb-6' placeholder="Введите код из письма" />
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={false}>
                    Сохранить
                </Button>
                <div className={classNames(styles.link, 'pb-4')}>
                    <p className="text text_color_inactive text_type_main-small pr-2">Вспомнили пароль?</p>
                    <Link to="/login">
                        <Button htmlType="button" type="secondary" size="medium" extraClass="p-1">
                            Войти
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}


export default ResetPassword;