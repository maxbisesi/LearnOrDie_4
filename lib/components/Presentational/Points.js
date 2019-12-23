import React from "react";
import { connect } from "react-redux";
import '../PointsSheet.css';

class Points extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {'nailed':0, 'whiffed':0, 'points': 0, 'streak': 0, 'rut': 0},
      onStreakClass: 'pointsNormal'
    };
  }

  componentDidMount() {

  }
 
  updateSession(result) {
    //copy the session object
    let sesh = Object.assign({},this.state.session);

    if(result === 'nailed') {
      let currentStreak = ++sesh.streak;
      sesh.rut = 0;
      ++sesh.nailed;
      let streakClass = 'pointsNormal';

      if( currentStreak < 5 && currentStreak > 0) {
        sesh.points += 1;
        streakClass = 'onStreak1';
      }
      else if (currentStreak >= 5 && currentStreak < 10) { 
        sesh.points += 10; 
        streakClass = 'onStreak2';
      }
      else if (currentStreak > 10 && currentStreak < 30) { 
        sesh.points += 20; 
        streakClass = 'onStreak3';
      }
      else if (currentStreak >= 30) { 
        sesh.points += 50; 
        streakClass = 'onStreak4';
      } 

      this.setState(() => {
        return {session: sesh, onStreakClass: streakClass};
      });

      return;
      
    }

    else if(result === 'whiffed') {
      let currentRut = ++sesh.rut;
      sesh.streak = 0;
      ++sesh.rut;

      if (currentRut > 5 && currentRut < 10) { 
         sesh.points -= 20; 
         
      }
      else if (currentRut > 10 && currentRut < 15) { 
        sesh.points -= 50; 
        
      }
      else if (currentRut >= 15) { 
        sesh.points -= 150; 
         
      } 
      sesh.points -= 10;

      this.setState((state,props) => {
        return {session: sesh};
      });
      return;
    }

    throw new Error('--- Points: updateSession: unkown result. ---');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.session.nailed !== this.props.session.nailed) { 
      console.log('nailed'); 
      //this.setState(() => { let updatedSession = this.updateSession('nailed'); return { session: updatedSession}; });
      this.updateSession('nailed');
    }
    else if(prevProps.session.whiffed !== this.props.session.whiffed) { 
      console.log('whiffed'); 
      //this.setState(() => {let updatedSession = this.updateSession('whiffed'); return { session: updatedSession}; });
      this.updateSession('whiffed');
    } else { 
      console.log(`--- Points: unknown Update ---`);
    }
  }

  componentWillUnmount(){

  }

  render() {
    console.log(`-- Points --`);
    return (
      <div className="pointsContainer">
        <p className={"pointsNormal "+this.state.onStreakClass}>{this.state.session.points}</p>
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
