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
      showAnswer: false,
      card: this.props.card,
      answer: this.props.answer,
      category: this.props.category,
      cardid: this.props.cardid,
      updates: {}
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  nextCard(e) { 
    let result = e.target.name;
    //Send result to Points componenent
    // If the user is just getting started, start them gracefully
    if(this.props.cardid === 'STARTERCARD') {this.props.next('GETSTARTED'); return null;}
    this.props.next(result);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //if(nextProps.index !== this.props.index) { return true; }
    //return false;
    //if(this.state.id !== nextState.id) {return true;}
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('TEST UPDATED');
    if(prevProps.cardid !== this.props.cardid) {
      this.setState((state,props) => {
        return {cardid: this.props.cardid, card: this.props.card, answer: this.props.answer, category: this.props.category};
      });
    }
  }

  componentWillUnmount(){
    console.log(`State on unmount: ${JSON.stringify(this.state)}`);
    if(Object.keys(this.state.updates).length > 0) { this.props.update(this.state.updates); }
    // do nothing
  }

  updateCard(e) { 
    // TODO animation here
    console.log('update card');
    this.setState((state,props) => {
      let cardUpdates = Object.assign({},state.updates);
      return (
        state.updates[this.props.cardid] = {
          cardid: this.props.cardid,
          card: this.state.card, 
          answer: this.state.answer, 
          category: this.state.category 
        });
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
    console.log('--- Test ---');
    return (
      <div id="test" style={{position: 'relative'}}>
        <Test_QandA handleChange={this.handleChange} showAnswer={this.state.showAnswer} card={this.state.card} answer={this.state.answer} category={this.state.category} />
        <div
          style={{marginTop: 10, marginBottom: 10}}
          id="setdisplay"
        ></div>

        <Points />

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
    cardid: state.currentCard.cardid,
    category: state.currentCard.category,
    index: state.index
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    next: (result) => dispatch(nextCard(result)),
    update: (rates) => dispatch(updateCards(rates)),
    saveSession: (session) => dispatch()
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
