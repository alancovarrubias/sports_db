import React from 'react'
import { render } from 'react-dom'

import './index.css'
import App from './containers/App'
import { unregister } from './registerServiceWorker'

render(
  <App />,
  document.getElementById('root')
);
unregister();
