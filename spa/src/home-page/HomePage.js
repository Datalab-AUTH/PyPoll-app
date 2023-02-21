import React from 'react';
import {Outlet} from 'react-router-dom';

import MenuBar from './MenuBar';
import FooterPage from './FooterPage';

function HomePage() {
    const URL = process.env.REACT_APP_APP_HOST;
    return (
        <div>
            <div>
                To view a shared graph file go to url: {URL}/embed/&lt;graph_id&gt;
                <br />
                Where &lt;graph_id&gt; is the id of the graph file.
                {/* <br />
                Example:  {URL}/embed/63deb771abf28b68fe1fab8c */}
            </div>
            {/*<MenuBar />*/}
            {/*<Outlet />*/}
            {/*<FooterPage />*/}
        </div>
    );
}

export default HomePage;
