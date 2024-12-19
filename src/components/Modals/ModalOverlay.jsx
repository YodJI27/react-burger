
import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {

    return (
        <div className={styles.backgroundModal} onClick={onClose}></div>
    )

}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}


export default ModalOverlay;