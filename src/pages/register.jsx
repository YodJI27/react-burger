import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm}>
                <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
                <Input type="name" placeholder="Имя" extraClass='pb-6' />
                <EmailInput extraClass='pb-6' />
                <PasswordInput extraClass='pb-6' />
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