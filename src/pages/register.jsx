import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { registerUser } from "../components/services/register-slice";
import { useForm } from "../hooks/useForm";


const Register = () => {

    const {values, handleChange} = useForm({email: '', password: '', name: ''});
    const {loading, error} = useSelector(store => store.registerUserSlice)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser(values));
    }

    useEffect(() => {
        if(loading && !error) {
            navigate('/login');
        }
    }, [loading, error])

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}> 
                <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
                <Input value={values.name} name="name" onChange={handleChange} placeholder="Имя" extraClass='pb-6' />
                <EmailInput value={values.email} name="email" onChange={handleChange} extraClass='pb-6' />
                <PasswordInput value={values.password} name="password" onChange={handleChange} extraClass='pb-6' />
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={false}>
                    Зарегестрироваться
                </Button>
                <div className={classNames(styles.link, 'pb-4')}>
                    <p className="text text_color_inactive text_type_main-small pr-2">Уже зарегистрированы?</p>
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


export default Register;