import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "../feeds/feed-order.module.css"
import FeedCard from "../feeds/feed-card";
import { wsConnectProfile, wsDisconnectProfile } from "../services/actions/orders-info";


const ProfileOrders = () => {

    const { orders, error } = useAppSelector(store => store.ordersUserSlice);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        dispatch(wsConnectProfile(`wss://norma.nomoreparties.space/orders?token=${token}`));

        return () => {
            dispatch(wsDisconnectProfile());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {!error && orders ? orders.map((item) => (
                <div key={item._id} className={styles.card}>
                    <FeedCard order={item} withStatusOrder />
                </div>
            )) : <div>Загрузка...</div>}
        </div>
    )
}


export default ProfileOrders;