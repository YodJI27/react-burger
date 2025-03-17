import styles from "./feed-order.module.css"
import { RootState } from "../../main";
import { useAppSelector } from "../../hooks/hooks";
import FeedCard from "./feed-card";

const FeedOrder = () => {
    const { orders } = useAppSelector(store => store.getFeedSlice);

    return (
        <div className={styles.container}>
            {orders.map((item) => (
                <div key={item._id} className={styles.card}>
                    <FeedCard order={item} />
                </div>
            ))}
        </div>
    )
}


export default FeedOrder;