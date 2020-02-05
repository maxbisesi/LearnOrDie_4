import React from "react";
import { connect } from "react-redux";
import '../Styles/RankModal.css';

class RankModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(`--- RankModal ---`);
    return (
        <div className="rankModal-container" style={{ display: this.props.show ? 'block' : 'none'}}> 
        
          <div className="rankModal-content">
            <span className="rankModal-close">&times;</span>
            <p> YOU EARNED a NEW RANK!</p>
          </div>
             
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

export default connect(mapStateToProps)(RankModal);
