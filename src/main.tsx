import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import '@/styles/index.less';
import '@/utils/rem';

const rootDOM = document.querySelector('#root');
const rootReact = rootDOM && ReactDOM.createRoot(rootDOM);

rootReact?.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
