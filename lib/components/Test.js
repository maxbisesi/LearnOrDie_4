import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";
import { rateCards, nextCard, saveSession } from '../actions';

class Test extends React.Component {
  constructor(props) {
    super(props);
    console.log('test');
    this.state = {
      index: 0,
      rating: [],
      session: {points: 0, streak: 0, rut: 0}
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
  }

  showAnswer(e) {
    // come up with something here
  }

  nextCard(e) { 
    console.log(`STATE before: ${JSON.stringify(this.state)}`);
    console.log(`PROPS before: ${JSON.stringify(this.props)}`);
    
    let result = e.target.name;

    this.setState((state,props) => { 
      // Update local state
      state.rating.push({cardId:state.index, result:result});
      let pointsChange = this.updatePoints(result,state.session);
      let ind = state.index;
      ind += 1;
      if(ind >= props.cardLength) {
        ind = 0;
      }
      this.props.next(ind);
      return {index: ind, session: pointsChange};
    });

  }

  updatePoints(result,session) {
    if(result === 'nailedit') {
      let newStreak = session.streak;
      let points = session.points;
      newStreak += 1;
      console.log(`new streak: ${newStreak} - old: ${session.streak}`);
      if (newStreak > 5 && newStreak < 10) { 
         points += 10; 
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
      return {points: points, streak: newStreak , rut: 0};
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
    if(nextState.index !== this.state.index) { return false; }
    if(nextState.session.points !== this.state.session.points){ return false; }
    return true;
  }

  componentDidMount() {
    this.setState( (state,props) => {
        return {session: props.session}
    });
  }

  componentWillUnmount(){
    // update store with this session
    this.props.rate(this.state.rating);
    //reset cards back to zero
    // this.props.next(0);
    // Update users points in the store, then when mounted again re instate them
    this.props.saveSesh(this.state.session);
  }

  previousCard() { 

  }

  render() {
    console.log(`STATE in render: ${JSON.stringify(this.state)}`);
    console.log(`PROPS in render: ${JSON.stringify(this.props)}`);
    return (
      <div id="test" style={{position: 'relative'}}>
        <div id="areas">
          <textarea readOnly value={this.props.card} rows="20" cols="50" id="cardArea"></textarea>
          <textarea readOnly value={this.props.answer} rows="20" cols="40" id="answerArea"></textarea>
        </div>

        <div
          style={{marginTop: 10, marginBottom: 10}}
          id="setdisplay"
        ></div>

        <div id="pointsdiv">
    <p className="pointsNormal" id="points">{this.state.session.points}</p>
        </div>

        <div id="buttoncontrolgroup">
          <input type="button" name="show" onClick={this.showAnswer} value="Show"/>
          <input type="button" id="update" value="Update"/>
          <input type="button" name="nailedit" onClick={this.nextCard} value="Nailed it"/>
          <input type="button" name="whiffed" onClick={this.nextCard} value="Missed it"/>
          <input type="button" name="whiffed" onClick={this.previousCard} value="Previous"/>
          <input type="button" id="comebacktothisone" value="Come back to this one!"/>
          <input type="button" id="review" value="Review" />
          <p id="questinfo">
            | Rating: <span id="rating"></span> | 
            Category:{" "}<span id="cat">{this.props.category} </span> | 
            Card Number: <span id="cardid"></span> |
            Questions To Review: <span id="reviewcount"></span>|
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.currentCard.card,
    answer: state.currentCard.answer,
    whiffed: state.currentCard.whiffed,
    nailed: state.currentCard.nailed,
    id: state.currentCard.id,
    category: state.currentCard.category,
    session: state.session,
    cardLength: state.cards.length,
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    next: (index) => dispatch(nextCard(index)),
    rate: (rates) => dispatch(rateCards(rates)),
    saveSesh: (session) => dispatch(saveSession(session))
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
