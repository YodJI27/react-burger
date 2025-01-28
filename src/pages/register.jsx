import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../components/services/register-slice";


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser({email: email, name: name, password: password}))
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }


    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}> 
                <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
                <Input value={name} onChange={handleChangeName} placeholder="Имя" extraClass='pb-6' />
                <EmailInput value={email} onChange={handleChangeEmail} extraClass='pb-6' />
                <PasswordInput value={password} onChange={handleChangePassword} extraClass='pb-6' />
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