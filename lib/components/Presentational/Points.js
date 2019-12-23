import React from "react";
import { connect } from "react-redux";
import '../PointsSheet.css';

class Points extends React.Component {
  constructor(props) {
    super(props);
    console.log('Points component');
    this.state = {
      session: {points: 0, streak: 0, rut: 0},
    };
  }

  componentDidMount() {

  }
 
  updatePoints(result) {
    //copy the session object
    let session = Object.assign({},this.state.session);
    if(result === 'nailed') {
      let newStreak = session.streak;
      let points = session.points;
      newStreak += 1;
      console.log(`new streak: ${newStreak} - old: ${session.streak}`);
      if (newStreak > 5 && newStreak < 10) { 
         newSession += 10; 
         return {points: points, streak: newStreak , rut: 0};
      }
      else if (newStreak > 10 && newStreak < 30) { 
        points += 20; 
         return {points: points, streak: newStreak , rut: 0};
      }
      else if (newStreak >= 30) { 
        points += 50; 
         return {points: points, streak: newStreak , rut: 0};
      } 
      points += 1;
      return {points: points, streak: newStreak, rut: 0};
    }
    else if(result === 'whiffed') {
      let missStreak = session.rut;
      let points = session.points;
      missStreak += 1;
      if (missStreak > 5 && missStreak < 10) { 
         points -= 20; 
         return {points: points, streak: 0 , rut: missStreak};
      }
      else if (missStreak > 10 && missStreak < 15) { 
        points -= 50; 
         return {points: points, streak: 0 , rut: missStreak};
      }
      else if (missStreak >= 15) { 
        points -= 150; 
         return {points: points, streak: 0 , rut: missStreak};
      } 
      points -= 10;
      return {points: points, streak: 0 , rut: missStreak};
    }
    throw new Error('updatePoints: unkown result.');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(Object.keys(this.props.updates).length !== Object.keys(nextProps.updates).length){
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //console.log(`Points: props= ${JSON.stringify(this.props.updates)} === cardid: ${JSON.stringify(this.props.cardid)}`);
    //console.log(`Points: prevProps= ${JSON.stringify(prevProps.updates)} === cardid: ${JSON.stringify(prevProps.cardid)}`);
    if(this.props.updates[prevProps.cardid].nailed === undefined) { 
      console.log(`Points: whiffed`);
      this.setState( (state,props) => { 
        let newSession = this.updatePoints('whiffed');
        return {session: newSession};
      }) 
    }
    if(this.props.updates[prevProps.cardid].whiffed === undefined) { 
      console.log(`Points: nailed`); 
      this.setState( (state,props) => { 
        let newSession = this.updatePoints('nailed');
        return {session: newSession};
      });
    }
  }

  componentWillUnmount(){

  }

  render() {
    console.log(`Points rendered`);
    return (
      <div id="pointsdiv">
        <p className="pointsNormal" id="points">{this.state.session.points}</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ( {
    saveSesh: (session) => dispatch(saveSession(session))
  } );
};

export default connect(null,mapDispatchToProps)(Points);
