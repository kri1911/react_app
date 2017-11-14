import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import Lawsuit from './containers/Lawsuit';
import Document from './containers/Document';
import Participant from './containers/Participant';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';
import { Route} from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import './style/App.css';

const history = createHistory()
const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
              <Route exact path='/' component={App} />
              <Route exact path='/lawsuit' component={Lawsuit} />
              <Route exact path='/lawsuit/:id' component={Lawsuit} />
              <Route exact path='/document' component={Document} />
              <Route path='/document/:id' component={Document} />
                <Route exact path='/participants' component={Participant} />
                <Route path='/participants/:id' component={Participant} />
            </div>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
