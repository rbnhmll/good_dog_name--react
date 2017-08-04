import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Index = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/:animal" component={App} />
      </div>
    </Router>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
