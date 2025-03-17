import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import styles from './home.module.css'
import FeedOrder from '../components/feeds/feed-order';
import OrderTotal from '../components/feeds/order-total';
import { wsConnect, wsDisconnect } from '../components/services/actions/websocketActions';

export const FeedPage = () => {

    const dispatch = useAppDispatch();

    const { orders, error } = useAppSelector(store => store.getFeedSlice);

    useEffect(() => {
        dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));

        return () => {
            dispatch(wsDisconnect());
        }
    }, [dispatch]);

    return (
        <div className={styles.feedContent}>
            {(!error) ? 
            <div className={styles.content}>
                <div className={styles.orderContent}>
                    <h2 className="text text_type_main-large pb-5">Лента заказов</h2>
                   {!error && orders && <FeedOrder />}
                </div>
                <div className={styles.orderContent}>
                    <OrderTotal />
                </div>
            </div> : <div className='text text_type_main-large'>...Загрузка</div>}
        </div>
    )
}