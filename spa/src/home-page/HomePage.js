import React from 'react';
import {Outlet} from 'react-router-dom';

import MenuBar from './MenuBar';
import FooterPage from './FooterPage';

function HomePage() {
    return (
        <div>
            <MenuBar />
            <Outlet />
            <FooterPage />
        </div>
    );
}

export default HomePage;
