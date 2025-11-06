import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './ComingSoon.css'
import ComingSoon from './ComingSoon.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactForm from './Contactform.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ComingSoon />} />
      <Route path="/contactus" element={<ContactForm />} />
      
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
