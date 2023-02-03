import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage from './home-page/HomePage';
import Embed from './embed/Embed';
import AboutUs from './home-page/AboutUs';
import LandPage from './home-page/LandPage';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<LandPage />} />
                        <Route path="/about" element={<AboutUs />} />
                    </Route>
                    <Route path="/embed/:id" element={<Embed />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
