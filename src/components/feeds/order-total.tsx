import classNames from "classnames";
import { useAppSelector } from "../../hooks/hooks";
import styles from './order-total.module.css'

const OrderTotal = () => {
    const { orders, total, totalToday} = useAppSelector(store => store.getFeedSlice);

    const doneOrders = orders.filter(el => el.status === "done").map(el => el.number);
    const pendingOrders = orders.filter(el => el.status === "pending").map(el => el.number);

    return (
        <div className={styles.container}>
            <div className={styles.orders}>
                <div className={styles.list}>
                    <p className="text text_type_main-medium pb-5">Готовы:</p>
                    <div className={styles.columnList}>
                        {doneOrders.map((item) => (
                            <p key={item}  className={classNames("text text_type_main-default", styles.done)}>{item}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.list}>
                    <p className="text text_type_main-medium pb-5">В работе:</p>
                    <div className={styles.columnList}>
                        {pendingOrders.map((item) => (
                            <p key={item} className="text text_type_main-default">{item}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-15">
                <div className={styles.total}>
                    <h2 className="text text_type_main-medium pb-2">Выполнено за все время:</h2>
                    <p className="text text_type_digits-large">{total}</p>
                </div>
                <div className={styles.total}>
                    <h2 className="text text_type_main-medium pb-2">Выполнено за сегодня:</h2>
                    <p className="text text_type_digits-large">{totalToday}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderTotal;