import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";
import { updateCards, nextCard, saveSession } from '../actions';
import Test_QandA from './Presentational/Test_QandA';
import Points from './Presentational/Points';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      updates: {},
      showAnswer: false,
      card: this.props.card,
      answer: this.props.answer,
      category: this.props.category,
      session: { status:'', nailed: 0, whiffed: 0, points: 0, streak: 0, rut: 0 }
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveSession = this.saveSession.bind(this);
  }

  nextCard(e) { 
    let result = e.target.name;
    //Send result to Poitns componenent
    this.setState((state,props) => { 
      //update cards with rating
      // copy state object
      let cardUpdates = Object.assign({},state.updates);
      // if no update exists for that ID yet, create it.
      // Do nothing to get started
      if( this.props.id === 'STARTERCARD') { this.props.next(0); return null; }
      else if( cardUpdates[this.props.id] === undefined ) { cardUpdates[this.props.id] = { [result]:1 }; }
      else if( cardUpdates[this.props.id][result] === undefined ) { cardUpdates[this.props.id][result] = 1; }
      else { cardUpdates[this.props.id][result] = cardUpdates[this.props.id][result] + 1; } 
      //-------------------------------------------------

      // Update local state
      // change index--------- > 
      //ths works
      let ind = state.index;
      ind += 1;
      if(ind >= props.cardLength) {
        ind = 0;
      }
      this.props.next(ind);
      //-=-=-=-=-=- -=-=-=-=-=-

      // Update Session
      let ratingUpdate = state.session[result];
      let newSession = Object.assign({},state.session,{ [result]:++ratingUpdate }); 
      //console.log(`Card Updates: ${JSON.stringify(cardUpdates)}`);
      let update = Object.assign({}, state, {index: ind, showAnswer: false, updates: cardUpdates, session: newSession} );
      return update;
    });

  }

  saveSession(sesh) {
    this.setState((state,props) => { return {session: sesh}; });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.index !== this.state.index) { return false; }
    return true;
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
    console.log(`Test unmount `);
    this.props.saveSesh(this.state.session);
    this.props.update(this.state.updates);
  }

  updateCard(e) { 
    // TODO animation here
    console.log('Test -> Update Card');
    this.setState((state) => {
      
      return (state.updates[this.props.id] = {
        id: this.props.id,
        card: this.state.card, 
        answer: this.state.answer, 
        category: this.state.category
      } );

    });
  }

  handleChange({ target }){
    let targ = target.name;
    if(targ === 'card'){ this.setState((state,props) => { return { [target.name]: target.value }; }); }
    if(targ === 'answer'){ this.setState((state,props) => { return { [target.name]: target.value }; }); }
    if(targ === 'category'){ this.setState((state,props) => { return { [target.name]: target.value }; }); }
 };

  showAnswer() {
      this.setState((state,props) => { return {showAnswer: true}; } );
  }

  render() {
    console.log('-- Test --');
    return (
      <div id="test" style={{position: 'relative'}}>
        <Test_QandA handleChange={this.handleChange} card={this.state.card} answer={this.state.showAnswer ? this.state.answer : "'click show'"} category={this.state.category} />

        <Points saveSession={this.saveSession} session={this.state.session} />

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
    cardLength: state.cards.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    next: (index) => dispatch(nextCard(index)),
    update: (rates) => dispatch(updateCards(rates)),
    saveSesh: session => dispatch(saveSession(session))
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
