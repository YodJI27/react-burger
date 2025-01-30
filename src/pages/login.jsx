import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import classNames from 'classnames';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../components/services/login-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkUserAuth } from '../components/services/get-user-slice';
import { useForm } from '../hooks/useForm';


const Login = () => {

    const {values, handleChange} = useForm({email: '', password: ''});
    const navigate = useNavigate();
    const checkAuthUser = checkUserAuth();

    if(checkAuthUser) {
        return <Navigate to="/" />
    }

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser({email: values.email, password: values.password}));
        navigate('/');
    }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium pb-6">Вход</h2>
                <EmailInput value={values.email} onChange={handleChange} name='email' extraClass='pb-6'/>
                <PasswordInput value={values.password} onChange={handleChange} name='password' extraClass='pb-6' />
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={false}>
                    Войти
                </Button>
                
                <div className={classNames(styles.link, 'pb-4')}>
                    <p className="text text_type_main-small pr-2">Вы - новый пользователь?</p>
                    <Link to="/register">
                        <Button htmlType="button" type="secondary" size="medium" extraClass="p-1">
                            Зарегестрироваться
                        </Button>
                    </Link>
                </div>
                <div className={styles.link}>
                    <p className="text text_type_main-small pr-2">Забыли пароль?</p>
                    <Link to="/forgot-password">
                        <Button htmlType="button" type="secondary" size="medium" extraClass="p-1">
                            Восстановить пароль
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}



export default Login;