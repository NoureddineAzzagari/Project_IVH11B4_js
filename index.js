import React from 'react';
import ReactDom from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MovieOverView from './src/js/components/Movies/movie-overview';
import {MovieDetail} from './src/js/components/Movies/movie-detail';
import App from './src/js/components/layout/App';
import {TvOverview} from './src/js/components/TvShows/tv-overview';
import LoginPage from './src/js/components/login';
import SignUpContainer from './src/js/components/signUp/signUpContainer';
import SignLayout from './src/js/components/layout/signLayout';
import { addLocaleData } from 'react-intl';
import {HotSwappingIntlProvider} from './src/js/components/hotSwappingIntlProvider';
import en from "react-intl/locale-data/en";
import nl from 'react-intl/locale-data/nl';
import localeData from './build/locales/reactIntlMessages.json';

addLocaleData([...en, ...nl]);

var language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, fallback to locale without region code, fallback to en
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;


/**
 * begin component voor de hele javascript applicatie
 * set alle routes en handeld deze af
 */
ReactDom.render(
  <HotSwappingIntlProvider initialLocale={language} initialMessages={messages}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={MovieOverView} />
          <Route path="movies" component={MovieOverView} />
          <Route path="tv" component={TvOverview} />
          <Route path="movie/detail/:id" component={MovieDetail} />
        </Route>
        <Route path="/signup" component={SignLayout}>
          <IndexRoute component={SignUpContainer} />
        </Route>
        <Route path="/login" component={SignLayout}>
          <IndexRoute component={LoginPage} />
        </Route>
      </Router>
  </HotSwappingIntlProvider>,
    document.getElementById("app")
);
