import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Subject} from '../../actions/movies';

/**
 * maakt de overview pagina voor movies
 */
export class MovieOverView extends React.Component{
  constructor(props){
      super(props);
      this.state = {movies: []};
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
    this.setState({movies: movies});
  }

  /**
   * methode die automatisch aangeroepen wordt als dit component geladen is
   * roept de observe methode aan met een nieuwe subject
   */
  componentDidMount(){
      this.observe(new Subject());
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render(){
    const noMovies = <div className="well">
      <h2>Er zijn momenteel geen films beschikbaar. Probeer het later opnieuw</h2>
    </div>
      return <div className="row overview-row">
          {this.state.movies.length > 0 ? this.state.movies.map((movie, index) =>{
            return <div className="col-md-2 col-sm-4 col-xs-6 col-lg-1" key={index}>
              <div className="cardWrap" onClick={() => {browserHistory.push(`movie/detail/${index}`)}}>
                <img src={movie.imgUrl} className="overview-img" />
                <div className="description">
                  <p className="title">
                    <b>{movie.title}</b>
                  </p>
                  <p className="release-year">
                    {movie.releaseDate}
                  </p>
                </div>

              </div>
            </div>
          }) : noMovies}
        </div>
  }
}
