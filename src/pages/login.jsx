import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm}>
                <h2 className="text text_type_main-medium pb-6">Вход</h2>
                <EmailInput name='email' extraClass='pb-6'/>
                <PasswordInput name='password' extraClass='pb-6' />
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