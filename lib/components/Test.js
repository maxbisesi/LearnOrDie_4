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
      id: this.props.id,
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
    if(this.props.id === 'STARTERCARD') {this.props.next('GETSTARTED'); return null;}
    this.props.next(result);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //if(nextProps.index !== this.props.index) { return true; }
    //return false;
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('TEST UPDATED');
    if(prevProps.id !== this.props.id) {
      this.setState((state,props) => {
        return {id: this.props.id, card: this.props.card, answer: this.props.answer, category: this.props.category};
      });
    }
  }

  componentWillUnmount(){
    // update store with this session
    //this.props.rate(this.state.rating);
    console.log(`State on unmount: ${this.state}`);
    this.props.update(this.state.updates);
  }

  updateCard(e) { 
    // TODO animation here
    console.log('update card');
    this.setState((state,props) => {
      let cardUpdates = Object.assign({},state.updates);
      if(cardUpdates[this.props.id] === undefined) {

      }

      return (
        state.updates[this.props.id] = {
        id: this.props.id,
        card: this.state.card, 
        answer: this.state.answer, 
        category: this.state.category
      } );

    });
  }

  handleChange({ target }){
    let targ = target.name;
    if(targ === 'card'){ this.setState((state,props) => { return { [target.name]: target.value } }); }
    if(targ === 'answer'){ this.setState((state,props) => { return { [target.name]: target.value } }); }
    if(targ === 'category'){ this.setState((state,props) => { return { [target.name]: target.value } }); }
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
    id: state.currentCard.id,
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
