import { useEffect, useState } from 'react'
import AppHeader from './AppHeader/AppHeader.jsx';
import BurgerConstructor from './burgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from './burgerIngredients/BurgerIngredients.jsx';
import styles from "./App.module.css";
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setIngredients } from './services/ingredients.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const URL_FOR_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(URL_FOR_INGREDIENTS)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка:`, res.status, res.statusText);
    })
    .then((data) => {
      console.log('Данные получены успешно');
      dispatch(setIngredients(data?.data));
      setSuccess(true);
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
      setError(true)
    })
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <section className={classNames(styles.mainContent)}>
              {success && <BurgerIngredients />}
              {success && <BurgerConstructor />}
              {error && <div>Проблема с данными...</div>}
          </section>
        </DndProvider>
      </main>
    </>
  )
}

export default App
