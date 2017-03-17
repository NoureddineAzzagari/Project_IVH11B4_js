import React from 'react';
import {getMovieById} from '../../actions/movies';

/**
 * maakt de detail weergave van films
 */
export class MovieDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.params.id,
      title: "",
      content: "",
      imgUrl: ""
    }
  }

  /**
   * methode die aangeroepen wordt als dit component geladen is
   * haalt informatie op over de film
   */
  componentDidMount(){
    getMovieById(this.state.id).then((json)=>{
      this.updateDetail(json);
    });
  }

  /**
   * update de informatie over de film
   * @param json informatie over de film
   */
  updateDetail(json){
    this.setState(json);
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render(){
      return <div>
        <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
          <img className="full-height" src={this.state.imgUrl}/>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6 full-height transparent-white">
          <h2>{this.state.title}</h2>
          <p>{this.state.content}</p>
        </div>
      </div>
  }
}
