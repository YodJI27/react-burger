
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../BurgerConstructor/burgerConstructor.module.css";
import classNames from "classnames";
import { setDeleteIngredient, setDragConstructor } from "../services/constructor";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ingredientPropTypes } from "../../../utils/IngredientType";
import PropTypes from "prop-types";
import { setPriceIngTotal } from "../services/ingredients";


const BurgerConstructorSliceCard = ({item, indexIng, moveCard}) => {

    const dispatch = useDispatch();
    const ref = useRef(null);
    const {priceIngTotal} = useSelector(store => store.ingredientsSlice);

    const handleDeleteIng = (element) => {
        dispatch(setDeleteIngredient(element))
        dispatch(setPriceIngTotal(priceIngTotal - item.price));
    }

    const [{ handlerId }, drop] = useDrop({
        accept: 'slice',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {

            if (!ref.current) {
                return
            }
            const dragIndex = item.indexIng
            const hoverIndex = indexIng

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex);

            item.indexIng = hoverIndex
        },
    });


    const [{isDragging}, drag] = useDrag({
        type: 'slice',
        item: () => {
            return {indexIng}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0.3 : 1;

    drag(drop(ref))

    return (
        <div className={classNames(styles.ingredientsCard, 'pb-4')} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary" className="pr-2" />
            <ConstructorElement
                text={item?.name}
                price={item?.price}
                thumbnail={item?.image}
                handleClose={(e => handleDeleteIng(indexIng))}
            />
        </div>
    )
}


export default BurgerConstructorSliceCard;

BurgerConstructorSliceCard.propTypes = {
    item: ingredientPropTypes,
    indexIng: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired
};