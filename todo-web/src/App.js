import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './containers/login';
import Register from './containers/register';
import Dashboard from './containers/dashboard';
import { Provider } from 'react-redux';
import { store, persistor } from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store} persistor={persistor}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
