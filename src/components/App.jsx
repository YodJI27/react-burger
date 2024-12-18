import { useEffect, useState } from 'react'
import AppHeader from './appHeader/AppHeader.jsx';
import BurgerConstructor from './burgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from './burgerIngredients/BurgerIngredients.jsx';
import styles from "./App.module.css";
import classNames from 'classnames';

const URL_FOR_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";

function App() {

  const [ingredientsData, setIngredientsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(URL_FOR_INGREDIENTS)
    .then(res => res.json())
    .then((data) => {
      console.log('Данные получены успешно')
      setIngredientsData(data.data)
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
        <section className={classNames(styles.mainContent)}>
            {ingredientsData && <BurgerIngredients data={ingredientsData} />}
            {ingredientsData && <BurgerConstructor data={ingredientsData}/>}
            {error && <div>Проблема с данными...</div>}
        </section>
      </main>
    </>
  )
}

export default App
