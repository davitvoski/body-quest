import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientID = "894584652526-lkgl54j73b02toq2np4r6mpl192f68in.apps.googleusercontent.com";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(  
  <React.StrictMode>
    
      <GoogleOAuthProvider clientId={clientID}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>

  </React.StrictMode>,
)
