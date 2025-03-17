import { DndProvider } from "react-dnd";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import classNames from "classnames";
import styles from './home.module.css';
import { RootState } from "../main";
import { useAppSelector } from "../hooks/hooks";


const Home = () => {
    const {loading, error} = useAppSelector(store => store.ingredientsSlice);

    return (
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <section className={classNames(styles.mainContent)}>
                  {!loading && <BurgerIngredients />}
                  {!loading && <BurgerConstructor />}
                  {error && <div>Проблема с данными...</div>}
              </section>
            </DndProvider>
          </main>
      )
}

export default Home;