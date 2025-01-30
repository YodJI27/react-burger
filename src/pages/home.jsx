import { DndProvider } from "react-dnd";
import BurgerIngredients from "../components/burgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/burgerConstructor/BurgerConstructor";
import { useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import classNames from "classnames";
import styles from './home.module.css';


const Home = () => {
    const {loading, error} = useSelector(store => store.ingredientsSlice);

    return (
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <section className={classNames(styles.mainContent)}>
                  {loading && <BurgerIngredients />}
                  {loading && <BurgerConstructor />}
                  {error && <div>Проблема с данными...</div>}
              </section>
            </DndProvider>
          </main>
      )
}

export default Home;