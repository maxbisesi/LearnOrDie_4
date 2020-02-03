import React from "react";
import { connect } from "react-redux";
import '../Styles/Points.css';

class Points extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    
  }


  render() {
    console.log(`--- Points ---`);
    return (
      <div className="pointsContainer">
        <p className={'pointsNormal ' + this.props.streakClass} id="points">{this.props.points}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    points : state.session.points,
    streak: state.session.streak,
    rut: state.session.rut,
    streakClass: state.session.streakClass
  };
};

export default connect(mapStateToProps)(Points);
