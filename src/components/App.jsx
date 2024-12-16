import { useState } from 'react'
import AppHeader from './appHeader/AppHeader';
import data from '../../utils/data';
import BurgerConstructor from './burgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from './burgerIngredients/BurgerIngredients.jsx';
import styles from "./App.module.css";
import classNames from 'classnames';

function App() {

  return (
    <>
      <header className={styles.header}>
        <AppHeader />
      </header>
      <main className={styles.main}>
        <section className={styles.mainContent}>
            <BurgerIngredients data={data} />
            <BurgerConstructor />
        </section>
      </main>
    </>
  )
}

export default App
