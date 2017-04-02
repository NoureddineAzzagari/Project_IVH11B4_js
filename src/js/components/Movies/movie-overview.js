import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Subject, FilterSubject} from '../../actions/movies';
import $ from 'jquery';
import {injectIntl, formatMessage, defineMessages} from 'react-intl';
import {messages} from './../../messages/movie-overview-messages';
import {addToFavourites} from './../../actions/favourites';

/**
 * maakt de overview pagina voor movies
 */
class MovieOverView extends React.Component{
  constructor(props){
      super(props);
      this.state = {movies: {
        movies: [],
        favouriteMovies: []
      },
        isLoading: true,
        isFilter: false,
        filterMovies: []};
  }

  /**
   * voegt dit component toe aan de lijst van observers voor informatie over nieuwe films
   * @param subject
   */
  observe(subject){
    subject.attach(this);
  }

  /**
   * voegt dit component toe aan de lijst van observers voor informatie over de filter
   * @param subject
   */
  observeFilter(subject){
    subject.attach(this);
  }

  /**
   * update de filter resultaten
   * @param movies gefilterde films
   * @param isFilter of dit een filter resultaat is
   */
  updateSearch(movies, isFilter){
    this.setState({isFilter: isFilter, filterMovies: movies});
  }

  /**
   * stopt de filter
   */
  static cancelFilter(){
    this.setState({isFilter: false});
  }

  /**
   * wordt aangeroepen door de observer als er nieuwe films beschikbaar zijn
   * set daarna de state van movies met de nieuwe films
   * @param movies lijst met films
   */
  update(movies){
    if(!movies) return;
    this.setState({movies: {movies: movies.movies, favouriteMovies:movies.favouriteMovies||[]}, isLoading: false});
  }

  /**
   * methode die automatisch aangeroepen wordt als dit component geladen is
   * roept de observe methode aan met een nieuwe subject
   * en zet een resize listener op de window om de component te updaten als de window size veranderd
   */
  componentDidMount(){
      this.observe(new Subject());
      this.observeFilter(new FilterSubject());
      $(window).resize(() => {
        this.forceUpdate();
      })
  }

  /**
   * Methode die automatisch aangeroepen wordt als dit component verdwijnt (bv. er wordt naar een andere pagina genavigeerd)
   * unbind de resize listener op de window
   */
  componentWillUnmount(){
    $(window).unbind("resize");
  }

  /**
   * rekent uit hoeveel films er per rij getoont worden aan de hand van de breedte van het scherm
   * @returns {number} hoeveelheid films per rij
   */
  static getAmountOfMoviesPerRow(){
    if ($(window).width() < 768) {
      return 12/6;
    }
    else if ($(window).width() >= 768 &&  $(window).width() <= 992) {
      return 12/4;
    }
    else if ($(window).width() > 992 &&  $(window).width() <= 1200) {
      return 12/2;
    }
    else  {
      return 12;
    }
  }

  /**
   * voegt een film toe aan de favoriten
   * @param e event om de propagation van te stoppen zodat er niet naar de detail pagina genavigeerd wordt
   * @param id id van de toe te voegen film
   */
  addMovieToFavourites(e, id){
    e.stopPropagation();
    addToFavourites(id);
    this.state.movies.movies.forEach((movie, index) => {
      if(movie.id == id){
        let movieState = Object.assign([], this.state.movies.movies);
        movieState = movieState.splice(index, 1);
        let favouriteState = Object.assign([], this.state.movies.favouriteMovies);
        favouriteState = favouriteState.concat(movie);
        this.setState({movies: {
          movies: movieState,
          favouriteMovies: favouriteState
        }});
      }
    })
  }


  /**
   * rendered de pagina
   * @returns {XML}
   */
  render(){
    this.index = 0;

    const noMovies = <div className="well">
      <h2>{this.props.intl.formatMessage(messages.Error)}</h2>
    </div>;

    let favourites = this.state.movies.favouriteMovies.length > 0 ? this.state.movies.favouriteMovies.map((movie, index) =>{
      this.index ++;
          return <div key={index}><div className="col-md-2 col-sm-4 col-xs-6 col-lg-1">
            <div className="cardWrap" onClick={() => {browserHistory.push(`movie/detail/${movie.id}`)}}>
              <img src={movie.imgUrl} className="overview-img" />
              <div className="description">
                <p className="title">
                  <b>{movie.title}</b>
                </p>
                <p className="release-year">
                  {movie.releaseDate}
                </p>
                <p>
                  <span className="glyphicon glyphicon-heart"></span>
                </p>
              </div>
            </div>
          </div>{((this.index) % MovieOverView.getAmountOfMoviesPerRow() == 0) ? <div className="row"></div> : "" }</div>
        }
      ):"";

    let movies = this.state.movies.movies.length > 0 ? this.state.movies.movies.map((movie, index) =>{
      this.index ++;
        return <div key={index}><div className="col-md-2 col-sm-4 col-xs-6 col-lg-1">
          <div className="cardWrap" onClick={() => {browserHistory.push(`movie/detail/${movie.id}`)}}>
            <img src={movie.imgUrl} className="overview-img" />
            <div className="description">
              <p className="title">
                <b>{movie.title}</b>
              </p>
              <p className="release-year">
                {movie.releaseDate}
              </p>
              <p>
                <a href="javascript:void(0)" onClick={(e) => this.addMovieToFavourites(e, movie.id)}><span className="glyphicon glyphicon-heart-empty"></span></a>
              </p>
            </div>
          </div>
        </div>{((this.index) % MovieOverView.getAmountOfMoviesPerRow() == 0) ? <div className="row"></div> : "" }</div>
      }) : this.state.movies.movies.length > 0 && this.state.movies.favouriteMovies.length > 0 ? "" : noMovies;

      return <div className="row overview-row">
        {!this.state.isFilter ?
          this.state.isLoading ? <div className="loader"></div> :
            <div>
              {favourites}
              {movies}
            </div>:
            this.state.filterMovies.map((movie, index)=>{
              return <div key={index}><div className="col-md-2 col-sm-4 col-xs-6 col-lg-1">
                <div className="cardWrap" onClick={() => {browserHistory.push(`movie/detail/${movie.id}`)}}>
                  <img src={movie.imgUrl} className="overview-img" />
                  <div className="description">
                    <p className="title">
                      <b>{movie.title}</b>
                    </p>
                    <p className="release-year">
                      {movie.releaseDate}
                    </p>
                    <p>
                      <span className="glyphicon glyphicon-heart-empty"></span>
                    </p>
                  </div>
                </div>
              </div>{((index + 1) % MovieOverView.getAmountOfMoviesPerRow() == 0) ? <div className="row"></div> : "" }</div>
            }
          )
        }
        </div>


  }
}
export default injectIntl(MovieOverView)
