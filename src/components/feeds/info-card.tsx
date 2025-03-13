import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { getOrderData } from "../services/info-order";
import styles from './info-card.module.css'
import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDate } from "./feed-card";


const InfoCard = () => {


    const {id} = useParams();
    const ingredients = useAppSelector(store => store.ingredientsSlice.ingredients);
    const {orders, total, totalToday } = useAppSelector(store => store.webSocketSlice);
    const {order} = useAppSelector(store => store.getOrderDataSlice);
    let orderData = orders.find(item => item.number.toString() == id);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getOrderData(Number(id)))
        }
    }, []);

    if(!orderData) orderData = order;

    if(!orderData) return <div>Ошибка</div>;

    console.log(orderData)

    let checkOrder: any = [];

    const priceOrder = orderData.ingredients.reduce((price, id) => {
        let options = ingredients.find(el => el._id === id)!;
        return options ? price + options.price : price;
    }, 0);

    const ingredientsCounter: { id: string; count: number; }[] = [];
    orderData.ingredients.forEach((id: string) => {
        const index = ingredientsCounter.findIndex(val => val.id === id)
        if (index !== -1) {
            ingredientsCounter[index].count++;
        } else {
            ingredientsCounter.push({
                id: id,
                count: 1
            })
        }
    });

    ingredientsCounter.forEach((item) => {
        let options = ingredients.find(el => el._id === item.id);
        if(!options) return;

        checkOrder.push(<div className={styles.row}>
            <div className={styles.imageContainer}>
                <div className={styles.ingredient} key={options._id}>
                    <img alt={options.name} src={options.image} className={styles.img} />
                </div>
                <p className="text text_type_main-default">{options.name}</p>
            </div>
            <div className={styles.price}>
                <p className="text text_type_main-default">{item.count}&nbsp;x&nbsp;{options.price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>)
    });

    let status = '';
    switch (orderData.status) {
        case "done":
            status = 'Выполнен';
            break;
        case "pending":
            status = 'В работе';
            break;
        case "created":
            status = 'Создан';
            break;

        default:
            break;
    }


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className="text text_type_digits-default">#{orderData.number}</p>
                <h2 className="text text_type_digits-medium">{orderData.name}</h2>
                <p className={classNames(styles.status, 'text text_type_main-small pt-5')}>{status}</p>
                <p className={classNames(styles.status, 'text text_type_main-medium pt-15 pb-5')}>Состав:</p>
                <div className={styles.ingredients}>
                    {checkOrder}
                </div>
                <div className={styles.priceContainer}>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(orderData.createdAt)}</p>
                    <div className={styles.price}>
                        <p className="text text_type_main-default">{priceOrder}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard;