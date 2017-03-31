import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Subject} from '../../actions/movies';
import $ from 'jquery';
import {injectIntl, formatMessage, defineMessages} from 'react-intl';
import {messages} from './../../messages/movie-overview-messages';

/**
 * maakt de overview pagina voor movies
 */
class MovieOverView extends React.Component{
  constructor(props){
      super(props);
      this.state = {movies: [], isLoading: true};
  }

  /**
   * voegt dit component toe aan de lijst van observers voor informatie over nieuwe films
   * @param subject
   */
  observe(subject){
    subject.attach(this);
  }

  /**
   * wordt aangeroepen door de observer als er nieuwe films beschikbaar zijn
   * set daarna de state van movies met de nieuwe films
   * @param movies lijst met films
   */
  update(movies){
    if(!movies) return;
    this.setState({movies: movies, isLoading: false});
  }

  /**
   * methode die automatisch aangeroepen wordt als dit component geladen is
   * roept de observe methode aan met een nieuwe subject
   * en zet een resize listener op de window om de component te updaten als de window size veranderd
   */
  componentDidMount(){
      this.observe(new Subject());
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
   * rendered de pagina
   * @returns {XML}
   */
  render(){
    const noMovies = <div className="well">
      <h2>{this.props.intl.formatMessage(messages.Error)}</h2>
    </div>
      return <div className="row overview-row">
          {this.state.isLoading ? <div className="loader"></div> :this.state.movies.length > 0 ? this.state.movies.map((movie, index) =>{
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
          }) : noMovies}
        </div>
  }
}
export default injectIntl(MovieOverView)
