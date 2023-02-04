import React from 'react';
import {Outlet} from 'react-router-dom';

import MenuBar from './MenuBar';
import FooterPage from './FooterPage';

function HomePage() {
    return (
        <div>
            <div>
                To view a shared graph file go to url: http://localhost:3000/embed/&lt;graph_id&gt;
                <br />
                Where &lt;graph_id&gt; is the id of the graph file.
                <br />
                Example: http://localhost:3000/embed/63deb771abf28b68fe1fab8c
            </div>
            {/*<MenuBar />*/}
            {/*<Outlet />*/}
            {/*<FooterPage />*/}
        </div>
    );
}

export default HomePage;
