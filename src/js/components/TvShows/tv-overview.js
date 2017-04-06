import React from 'react';
import {browserHistory} from 'react-router';
import {getShows} from '../../actions/shows';

/**
 * maakt de overview pagina voor de tv shows
 */
export class TvOverview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: {
        shows: [],
        favouriteTvShows: []
      },
      isLoading: true,
      isFilter: false,
      filterTvShows: []
    };
    this.updateShows = this.updateShows.bind(this);
  }

  /**
   * voegt dit component toe aan de lijst van observers voor informatie over nieuwe tv sseries
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
   * @param shows gefilterde tv series
   * @param isFilter of dit een filter resultaat is
   */
  updateSearch(shows, isFilter){
    this.setState({isFilter: isFilter, filterTvShows: movies});
  }

  /**
   * stopt de filter
   */
  static cancelFilter(){
    this.setState({isFilter: false});
  }

  /**
   * set de state van shows zodra nieuwe shows beschikbaar zijn
   * @param shows lijst met alle shows
   */
  updateShows(shows) {
    this.setState({shows: shows});
  }

  /**
   * methode die automatisch aangeroepen wordt als deze compenent geladen is
   * haalt alle shows op
   */
  componentDidMount() {
    getShows().then((json) => {
      this.updateShows(json);
    });
  }

  /**
   * Methode die automatisch aangeroepen wordt als dit component verdwijnt (bv. er wordt naar een andere pagina genavigeerd)
   * unbind de resize listener op de window
   */
  componentWillUnmount(){
    $(window).unbind("resize");
  }

  /**
   * rekent uit hoeveel tv series er per rij getoont worden aan de hand van de breedte van het scherm
   * @returns {number} hoeveelheid tv series per rij
   */
  static getAmountOfTvShowsPerRow(){
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
   * voegt een tv serie toe aan de favoriten
   * @param e event om de propagation van te stoppen zodat er niet naar de detail pagina genavigeerd wordt
   * @param id id van de toe te voegen tv show
   */
  addTvShowToFavourites(e, id){
    e.stopPropagation();
    addTvShowToFavourites(id);
    this.state.shows.shows.forEach((show, index) => {
      if(show.id == id){
        let tvShowState = Object.assign([], this.state.shows.shows);
        tvShowState = tvShowState.splice(index, 1);
        let favouriteState = Object.assign([], this.state.shows.favouriteTvShows);
        favouriteState = favouriteState.concat(show);
        this.setState({shows: {
          shows: tvShowStateState,
          favouriteTvShows: favouriteState
        }});
      }
    })
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render() {
    return <div className="row overview-row">
      {this.state.shows.map((show, index) => {
        return <div className="col-md-2 col-sm-4 col-xs-6 col-lg-1" key={index}>
          <div className="cardWrap" onClick={() => {
            browserHistory.push(`/detail/${index}`)
          }}>
            <img src={show.imageUrl} className="overview-img"/>
            <div className="description">
              <p className="title">
                <b>{show.name}</b>
              </p>
              <p className="release-year">
                {show.releaseDate}
              </p>
            </div>

          </div>
        </div>
      })}
    </div>
  }
}
