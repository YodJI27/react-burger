import { useState } from 'react'
import AppHeader from './appHeader/AppHeader.jsx';
import data from '../../utils/data';
import BurgerConstructor from './burgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from './burgerIngredients/BurgerIngredients.jsx';
import styles from "./App.module.css";
import classNames from 'classnames';

function App() {

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <section className={classNames(styles.mainContent)}>
            {data && <BurgerIngredients data={data} />}
            {data && <BurgerConstructor data={data}/>}
        </section>
      </main>
    </>
  )
}

export default App
