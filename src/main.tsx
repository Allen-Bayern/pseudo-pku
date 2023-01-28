import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/index.less';

const rootDOM = document.querySelector('#root');
const rootReact = rootDOM && ReactDOM.createRoot(rootDOM);

rootReact?.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
