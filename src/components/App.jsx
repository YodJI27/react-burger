import { useEffect } from 'react'
import AppHeader from './AppHeader/AppHeader.jsx';
import BurgerConstructor from './burgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from './burgerIngredients/BurgerIngredients.jsx';
import styles from "./App.module.css";
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/ingredients.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const {loading, error} = useSelector(store => store.ingredientsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <section className={classNames(styles.mainContent)}>
              {loading && <BurgerIngredients />}
              {loading && <BurgerConstructor />}
              {error && <div>Проблема с данными...</div>}
          </section>
        </DndProvider>
      </main>
    </>
  )
}

export default App
