
import styles from './ingredientsDetails.module.css';
import classNames from "classnames";
import { ingredientPropTypes } from '../../../utils/IngredientType';

const IngredientDetails = ({data}) => {

    return (
        <div className={classNames(styles.modalContainer, 'pt-10 pb-2 pr-10 pl-10')}>

            <img src={data.image_large} alt={data.name} />
            <h2 className="text text_type_main-medium pb-8 pt-4">{data.name}</h2>
            
            <div className={styles.structure}>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{data.calories}</p>
                </div>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{data.proteins}</p>
                </div>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{data.fat}</p>
                </div>
                <div className={styles.blockStructure}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{data.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}


IngredientDetails.propTypes = {
    data: ingredientPropTypes
}

export default IngredientDetails;