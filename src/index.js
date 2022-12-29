import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/GlobalStyle/GlobalStyle';
import AuthProvider from './Context/AuthContext';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <GlobalStyle>
          <App/>
        </GlobalStyle>
      </Provider>
    </AuthProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
