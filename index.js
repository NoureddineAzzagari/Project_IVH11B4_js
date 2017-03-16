import React from 'react';
import ReactDom from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {MovieOverView} from './Component/Movies/movie-overview';
import {MovieDetail} from './Component/Movies/movie-detail';
import {App} from './Component/App';
import {TvOverview} from './Component/TvShows/tv-overview';
import {LoginPage} from './Component/login';


ReactDom.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={MovieOverView} />
                <Route path="movies" component={MovieOverView} />
                <Route path="tv" component={TvOverview} />
                <Route path="movie/detail/:id" component={MovieDetail} />
                <Route path="login" component={LoginPage} />
            </Route>
        </Router>,
    document.getElementById("app")
);
