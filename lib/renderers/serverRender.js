import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import Main_FUNC from 'features/Global/Main_FUNC';
import config from 'config';
const serverRender = async () => {
    //const resp = await axios.get(`http://${config.host}:${config.port}/data`);
    //const api = new DataApi(resp.data);
    
    //const initialData = { data: api.getData, cards: api.getCards }

    //return ReactDOMServer.renderToString(<Login initialData={initialData} />);
    return ReactDOMServer.renderToString(<Main_FUNC />);
};

export default serverRender;