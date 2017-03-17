import React from 'react';
import {browserHistory} from 'react-router';
import {getShows} from '../../actions/shows';

/**
 * maakt de overview pagina voor de tv shows
 */
export class TvOverview extends React.Component{

  constructor(props){
    super(props);
    this.state = {shows: []};
    this.updateShows = this.updateShows.bind(this);
  }

  /**
   * set de state van shows zodra nieuwe shows beschikbaar zijn
   * @param shows lijst met alle shows
   */
  updateShows(shows){
    this.setState({shows: shows});
  }

  /**
   * methode die automatisch aangeroepen wordt als deze compenent geladen is
   * haalt alle shows op
   */
  componentDidMount(){
    getShows().then((json)=>{
      this.updateShows(json);
    });
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render(){
    return <div className="row overview-row">
      {this.state.shows.map((show, index) =>{
        return <div className="col-md-2 col-sm-4 col-xs-6 col-lg-1" key={index}>
          <div className="cardWrap" onClick={() => {browserHistory.push(`/detail/${index}`)}}>
            <img src={show.imageUrl} className="overview-img" />
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
