import styles from "./feed-order.module.css"
import { Order } from "../../../utils/IngredientType"
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

interface IFeedCardProps {
    order: Order,
    withStatusOrder?: boolean
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
  
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  
    const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "Europe/Moscow",
    });

    if (isToday) {
      return `Сегодня, ${timeFormatter.format(date)} i-GMT+3`;
    } else {
      const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
      });
      return `${dateFormatter.format(date)}, ${timeFormatter.format(date)} i-GMT+3`;
    }
  };


const FeedCard: FC<IFeedCardProps> = ({order, withStatusOrder}) => {

    const ingredients = useAppSelector(store => store.ingredientsSlice.ingredients);
    const location = useLocation();

    let checkOrder: any = [];

    const priceOrder = order.ingredients.reduce((price, id) => {
        let options = ingredients.find(el => el._id === id)!;
        return options ? price + options.price : price;
    }, 0);

    order.ingredients.slice(0,6).forEach((id, i) => {
        let options = ingredients.find(el => el._id === id);
        if(!options) return;

        checkOrder.push(<div className={styles.ingredient} key={i}>
            <img alt={options.name} src={options.image} className={styles.img} />
        </div>)
    });

    let status = '';
    switch (order.status) {
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
        <Link to={`${location.pathname}/${order.number}`} key={order._id} className={styles.link}>
            <div className={styles.header}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
            </div>
            <h2 className="text text_type_main-medium pb-5 pt-5">{order.name}</h2>
            {withStatusOrder && <p className="text text_type_main-default pb-5" style={order.status == 'done' ? {color: '#00CCCC'} : {}}>{status}</p>}
            <div className={styles.footer}>
                <div className={styles.imageContainer}>{checkOrder}</div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">{priceOrder}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}


export default FeedCard;