import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';

import './styles/index.scss';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
