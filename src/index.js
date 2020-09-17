import React from 'react';
import ReactDom from 'react-dom';
import 'regenerator-runtime/runtime';

import App from './components/App';
import './styles/index.scss';

ReactDom.render(React.createElement(App), document.getElementById('app'));
