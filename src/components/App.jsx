import AppHeader from './AppHeader/AppHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/ingredients.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import { useEffect } from 'react';
import Register from '../pages/register.jsx';
import ForgotPassword from '../pages/forgot-password.jsx';
import ResetPassword from '../pages/reset-password.jsx';
import Profile from '../pages/profile.jsx';

function App() {
  const {loading, error} = useSelector(store => store.ingredientsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  return (
    <>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/ingredients/:id" />
        </Routes>
      </Router>
    </>
  )
}

export default App
