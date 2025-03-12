import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import styles from './home.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../main';
import { connectWebSocket } from '../components/services/feed';
import FeedOrder from '../components/feeds/feed-order';
import OrderTotal from '../components/feeds/order-total';

export const FeedPage = () => {

    const dispatch = useAppDispatch();
    const { connected, orders, error } = useAppSelector(store => store.webSocketSlice);

    useEffect(() => {
        dispatch(connectWebSocket());
    }, [dispatch]);

    return (
        <div className={styles.feedContent}>
            <div className={styles.content}>
                <div className={styles.orderContent}>
                    <h2 className="text text_type_main-large pb-5">Лента заказов</h2>
                   {!error && orders &&  <FeedOrder />}
                </div>
                <div className={styles.orderContent}>
                    <OrderTotal />
                </div>
            </div>
        </div>
    )
}