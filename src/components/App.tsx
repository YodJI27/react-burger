import AppHeader from './AppHeader/AppHeader.js';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/ingredients';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from '../pages/login';
import { useEffect } from 'react';
import Register from '../pages/register';
import ForgotPassword from '../pages/forgot-password';
import ResetPassword from '../pages/reset-password';
import Profile from '../pages/profile';
import { ProtectedRouteElement } from './ProtectedRouteElement/ProtectedRouteElement.js';
import IngredientDetails from './Modals/IngredientsDetails';
import Modal from './Modals/Modal';
import { setOpenModalIngredients } from './services/ingredient-details';
import { NotFound } from '../pages/not-found';
import Home from '../pages/home';
import { useAppDispatch } from '../hooks/hooks';
import { FeedPage } from '../pages/feed.js';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const background =  location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  const handleCloseModal = () => {
    dispatch(setOpenModalIngredients(false));
    navigate(-1);
  }

  return (
    <div>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ProtectedRouteElement checkAuth component={<Register />} />}/>
        <Route path="/forgot-password" element={<ProtectedRouteElement checkAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement checkAuth component={<ResetPassword />} />}/>
        <Route path="/profile" element={<ProtectedRouteElement component={<Profile />} />}/>
        <Route path="/profile/orders" element={<ProtectedRouteElement component={<Profile />} />}/>
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}


    </div>
  )
}

export default App
