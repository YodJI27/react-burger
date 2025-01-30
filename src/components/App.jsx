import AppHeader from './AppHeader/AppHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/ingredients.js';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import { useEffect } from 'react';
import Register from '../pages/register.jsx';
import ForgotPassword from '../pages/forgot-password.jsx';
import ResetPassword from '../pages/reset-password.jsx';
import Profile from '../pages/profile.jsx';
import { ProtectedRouteElement } from './ProtectedRouteElement/ProtectedRouteElement.jsx';
import IngredientDetails from './Modals/IngredientsDetails.jsx';
import Modal from './Modals/Modal.jsx';
import { setOpenModalIngredients } from './services/ingredient-details.js';
import { NotFound } from '../pages/not-found.jsx';

function App() {
  const dispatch = useDispatch();
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
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={
              <Modal header='Детали ингредиента' onClose={handleCloseModal}>
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
