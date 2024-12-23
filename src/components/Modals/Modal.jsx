
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import ModalOverlay from "./ModalOverlay";
import classNames from "classnames";
import PropTypes from "prop-types";

const modalRoot = document.getElementById('modals');

const Modal = ({title, onClose, children}) => {

    useEffect(() => {

        const handleCloseModal = (e) => {
            if(e.code === 'Escape'){
                onClose();
            }
        }

        document.addEventListener("keyup", handleCloseModal);
        return () => {
            document.removeEventListener("keyup", handleCloseModal)
        }
    }, []);

    return createPortal(
        <>
            <div className={classNames(styles.modalContainer, 'pt-10 pr-10 pl-10 pb-10')}>
                <div className={styles.titleContainer}>
                    <h2 className="text text_type_main-medium">{title}</h2>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
            <ModalOverlay onClose={onClose}/>
        </>,
        modalRoot
    )

}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
};

export default Modal;