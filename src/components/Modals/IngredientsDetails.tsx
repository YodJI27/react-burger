
import styles from './ingredientsDetails.module.css';
import classNames from "classnames";
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { IIngredientPropTypes } from '../../../utils/IngredientType';

const IngredientDetails = () => {

    const ingredient = useAppSelector(store => store.ingredientsDetailsSlice.ingredientsDetails);
    const listIng: Array<IIngredientPropTypes> = useAppSelector(store => store.ingredientsSlice.ingredients);

    const { id } = useParams();

    const options = ingredient ? ingredient : listIng.find(item => item._id == id);

    if(!options) {
        return null
    }

    return (
        <div className={classNames(styles.modalContainer, 'pt-10 pb-2 pr-10 pl-10')}>

            <img src={options.image_large} alt={options.name} />
            <h2 className="text text_type_main-medium pb-8 pt-4">{options.name}</h2>
            
            <div className={styles.structure}>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{options.calories}</p>
                </div>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{options.proteins}</p>
                </div>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{options.fat}</p>
                </div>
                <div className={styles.blockStructure}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{options.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}


export default IngredientDetails;