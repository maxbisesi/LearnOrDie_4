import React from "react";
import { connect } from "react-redux";
import '../Styles/Points.css';

class Points extends React.Component {
  constructor(props) {
    super(props);
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
    streakClass: state.session.streakClass,
    userName: state.user.userName,
    totalPoints: state.user.totalPoints,
    cardCount: state.user.cardCount,
    rank: state.user.rank 
  };
};

export default connect(mapStateToProps)(Points);
