import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { authUser } from "../services/get-user-slice";
import { refreshToken } from "../services/refresh-token-slice";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUser } from "../services/patch-user-slice";


const ProfileUser = () => {

    const dispatch = useAppDispatch();
    const {name, email, message, loading} = useAppSelector(store => store.getUserSlice);
    const {access} = useAppSelector(store => store.refreshTokenSlice);
    const [isChange, setIsChange] = useState(false);
    const {values, handleChange, setValues} = useForm({email: email, password: '', name: name});

    useEffect(() => {
        if(!loading) {
            setValues({ email: email, name: name, password: '' });
        }
    }, [loading]);

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

    return (
        <form className="pt-5 pl-20" onSubmit={handleSubmitUser}>
        <div>
            <Input icon='EditIcon' name={'name'} value={!loading ? values.name : "Загрузка..."} onChange={handleChange} placeholder={"Имя"} extraClass="pb-6" />
            <EmailInput isIcon={true} name={'email'} value={!loading ? values.email : "Загрузка..."} onChange={handleChange} placeholder={"Логин"} extraClass="pb-6"/>
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
    )
}

export default ProfileUser;