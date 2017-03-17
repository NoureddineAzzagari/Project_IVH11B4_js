import React from 'react';
import ReactDom from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {MovieOverView} from './Component/Movies/movie-overview';
import {MovieDetail} from './Component/Movies/movie-detail';
import {App} from './Component/App';
import {TvOverview} from './Component/TvShows/tv-overview';
import {LoginPage} from './Component/login';
import {SignUp} from './Component/signUp';
import {SignLayout} from './Component/signLayout';


/**
 * begin component voor de hele javascript applicatie
 * set alle routes en handeld deze af
 */
ReactDom.render(
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={MovieOverView} />
          <Route path="movies" component={MovieOverView} />
          <Route path="tv" component={TvOverview} />
          <Route path="movie/detail/:id" component={MovieDetail} />
        </Route>
        <Route path="/signup" component={SignLayout}>
          <IndexRoute component={SignUp} />
        </Route>
        <Route path="/login" component={SignLayout}>
          <IndexRoute component={LoginPage} />
        </Route>

      </Router>,
    document.getElementById("app")
);
