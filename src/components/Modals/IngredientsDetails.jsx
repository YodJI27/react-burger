
import styles from './ingredientsDetails.module.css';
import classNames from "classnames";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

    const ingredient = useSelector(store => store.ingredientsDetailsSlice.ingredientsDetails);

    return (
        <div className={classNames(styles.modalContainer, 'pt-10 pb-2 pr-10 pl-10')}>

            <img src={ingredient.image_large} alt={ingredient.name} />
            <h2 className="text text_type_main-medium pb-8 pt-4">{ingredient.name}</h2>
            
            <div className={styles.structure}>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
                </div>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
                </div>
                <div className={classNames(styles.blockStructure, 'pr-5')}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
                </div>
                <div className={styles.blockStructure}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}


export default IngredientDetails;