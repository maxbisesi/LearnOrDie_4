import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";
import { rateCard, nextCard, saveSession } from '../actions';
import Test_QandA from './Presentational/Test_QandA';

class Test extends React.Component {
  constructor(props) {
    super(props);
    console.log('Test component');
    this.state = {
      index: 0,
      rating: [],
      updates: {},
      session: {points: 0, streak: 0, rut: 0},
      showAnswer: false,
      card: this.props.card,
      answer: this.props.answer,
      category: this.props.category
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.updateCard = this.updateCard.bind(this);

  }

  nextCard(e) { 
    let result = e.target.name;

    this.setState((state,props) => { 
      // Update local state
      //state.rating.push({cardId:state.index, result:result});
      let pointsChange = this.updatePoints(result,state.session);

      // change index---------
      let ind = state.index;
      ind += 1;
      if(ind >= props.cardLength) {
        ind = 0;
      }
      this.props.next(ind);
      //-=-=-=-=-=- -=-=-=-=-=-
      
      //update cards with rating
      let cardUpdates = Object.assign({},state.updates);
      cardUpdates[this.props.id] = { [result]:this.props[result] +1 };
      let update = Object.assign({}, state, {index: ind, session: pointsChange, showAnswer: false, updates: cardUpdates} );
      
      return update;
    });

  }

  updatePoints(result,session) {
    if(result === 'nailed') {
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
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.card != this.props.card) {
      this.setState((state,props) => {
        return {card: this.props.card, answer: this.props.answer, category: this.props.category};
      });
    }
  }

  componentWillUnmount(){
    // update store with this session
    //this.props.rate(this.state.rating);
    console.log(this.state);
    //reset cards back to zero
    // this.props.next(0);
    // Update users points in the store, then when mounted again re instate them
    this.props.update(this.state.updates);
    this.props.saveSesh(this.state.session);
  }

  updateCard(e) { 
    // TODO animation here
    console.log('update card');
    this.setState((state,props) => {
      
      return (state.updates[this.state.id] = {
        id: this.state.id,
        card: this.state.card, 
        answer: this.state.answer, 
        category: this.state.category
      } );

    });
  }

  handleChange = ({ target }) => {
    let targ = target.name;
    if(targ === 'card'){ this.setState({ [target.name]: target.value }); }
    if(targ === 'answer'){ this.setState({ [target.name]: target.value }); }
    if(targ === 'category'){ this.setState({ [target.name]: target.value }); }
 };

  showAnswer() {
      this.setState((state,props) => { return {showAnswer: true}; } );
  }

  render() {
    return (
      <div id="test" style={{position: 'relative'}}>
        <Test_QandA handleChange={this.handleChange} card={this.state.card} answer={this.state.showAnswer ? this.state.answer : "'click show'"} category={this.state.category} />
        <div
          style={{marginTop: 10, marginBottom: 10}}
          id="setdisplay"
        ></div>

        <div id="pointsdiv">
    <p className="pointsNormal" id="points">{this.state.session.points}</p>
        </div>

        <div id="buttoncontrolgroup">
          <input type="button" name="show" onClick={this.showAnswer} value="Show"/>
          <input type="button" id="update" value="Update" onClick={this.updateCard}/>
          <input type="button" name="nailed" onClick={this.nextCard} value="Nailed it"/>
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
    update: (rates) => dispatch(updateCards(rates)),
    saveSesh: (session) => dispatch(saveSession(session))
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
