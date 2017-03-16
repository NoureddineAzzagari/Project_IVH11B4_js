import React from 'react';
import {browserHistory} from 'react-router';
import {getShows} from '../../actions/shows';

export class TvOverview extends React.Component{

  constructor(props){
    super(props);
    this.state = {shows: []};
    this.updateShows = this.updateShows.bind(this);
  }

  updateShows(shows){
    this.setState({shows: shows});
  }

  componentDidMount(){
    getShows().then((json)=>{
      this.updateShows(json);
    });
  }

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
