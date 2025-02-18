
import { FC } from "react";
import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

interface IModalOverlay {
    onClose: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({onClose}) => {

    return (
        <div className={styles.backgroundModal} onClick={onClose}></div>
    )

}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}


export default ModalOverlay;