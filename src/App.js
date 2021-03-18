import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Invnetory from './components/Inventory/Invnetory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h2>email: {loggedInUser.email}</h2>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/inventory">
            <Invnetory></Invnetory>
          </PrivateRoute>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route exact path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute exact path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>

          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>

          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>


      </Router>



    </UserContext.Provider>
  );
}

export default App;
