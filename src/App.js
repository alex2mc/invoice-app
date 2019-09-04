import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import NavTabs from './components/NavTabs/NavTabs'
import './App.css';



export default function App() {
  return (
    <BrowserRouter>
        <NavTabs />
        <Router />
    </BrowserRouter>
  );
}