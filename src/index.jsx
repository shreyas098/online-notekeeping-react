import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

// setting up fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <App />,
    document.getElementById('app')
);