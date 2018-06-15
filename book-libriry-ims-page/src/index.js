import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IndexRouter from "./router/IndexRouter"
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<IndexRouter />, document.getElementById('root'));

registerServiceWorker();
