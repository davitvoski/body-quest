import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientID = process.env.GOOGLE_CLIENT_ID ?? "";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(  
  <React.StrictMode>
    
      <GoogleOAuthProvider clientId={clientID}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>

  </React.StrictMode>,
)
