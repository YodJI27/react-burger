import styles from './orderDetails.module.css';
import classNames from "classnames";
import Icon from "../../images/done.svg";
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';

const OrderDetails = () => {

    const orderData = useAppSelector(store => store.orderSlice.order);

    return (
        <div className={classNames(styles.modalContainer, 'pt-10 pb-20 pr-20 pl-20')}>
            {/* @ts-ignore */}
            <h2 className="text text_type_digits-large pb-8">{orderData}</h2>
            <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
            <div className="pb-15">
                <img src={Icon} alt="Загадочная субстанция на фоне и белая галка принятия заказа в центре" />
            </div>
            <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;