import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import classNames from 'classnames';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { forgotPasswordPost } from "../components/services/forgot-password-slice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";


const ForgotPassword = () => {

    const {values, handleChange} = useForm({email: ''});
    const dispatch = useDispatch();
    const {loading} = useSelector((store) => store.forgotPasswordSlice);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(forgotPasswordPost(values));
    }

    if(loading) {
        return <Navigate to="/reset-password" />
    }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
                <EmailInput value={values.email} name="email" onChange={handleChange} extraClass='pb-6' placeholder="Введите E-mail" />
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={false}>
                    Восстановить
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


export default ForgotPassword;