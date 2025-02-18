import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.css'
import { Provider } from 'react-redux';
import store from './components/services/index';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(
  document.getElementById('root')!
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

root.render(
  <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</StrictMode>
)
