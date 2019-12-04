import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Login from './components/Login';

const serverRender = () => {
    return ReactDOMServer.renderToString(<Login />);
};

export default serverRender;