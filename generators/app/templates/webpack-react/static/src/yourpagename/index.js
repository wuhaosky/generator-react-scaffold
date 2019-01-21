import React from 'react';
import ReactDom from 'react-dom';
import App from './app.jsx'
import './index.less';

function renderTest() {
	ReactDom.render( <App/> ,
		document.getElementById('app')
	);
}

(function init() {
	renderTest();
})();
