import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "../feeds/feed-order.module.css"
import FeedCard from "../feeds/feed-card";
import { closeWebSocketOrders, connectToOrdersWebSocket } from "../services/order-user";


const ProfileOrders = () => {

    const { orders, total, totalToday } = useAppSelector(state => state.ordersSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            dispatch(connectToOrdersWebSocket(token));
        }

        return () => {
            dispatch(closeWebSocketOrders());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {orders.map((item) => (
                <div key={item._id} className={styles.card}>
                    <FeedCard order={item} withStatusOrder />
                </div>
            ))}
        </div>
    )
}


export default ProfileOrders;