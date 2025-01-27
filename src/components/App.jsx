import AppHeader from './AppHeader/AppHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/ingredients.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import { useEffect } from 'react';
import Register from '../pages/register.jsx';

function App() {
  const {loading, error} = useSelector(store => store.ingredientsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/forgot-password" />
          <Route path="/reset-password" />
          <Route path="/profile" />
          <Route path="/ingredients/:id" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
