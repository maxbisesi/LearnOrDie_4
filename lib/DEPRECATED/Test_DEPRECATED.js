/*import React, { useState } from "react";
//import "./QuestionPageSheet.css";
import { saveForReview } from '../features/Test/testSlice';
import { next, update } from '../features/Cards/cardSlice';
import Test_QandA from '../features/Test/Test_QandA';
import Points from '../features/Test/Points';
import RankModal from '../features/User/RankModal';
import { connect } from 'react-redux';

class Test extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      card: this.props.card,
      answer: this.props.answer,
      category: this.props.category,
      cardid: this.props.cardid,
      updates: {},
      reviewDisabled: true
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.comeBack = this.comeBack.bind(this);
    this.allClicks = this.allClicks.bind(this);

  }

  nextCard(e) { 
    console.log('next card');
    let result = e.target.name;
    //Send result to Points componenent
    // If the user is just getting started, start them gracefully
    if(this.props.cardid === 'STARTERCARD') {next('GETSTARTED'); return null;}
    this.props.next(result);
  }

  allClicks(e) {
    // TODO disalbe when card added or user logs in. 
    e.stopPropagation();
    alert('Add some cards before testing yourself');
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
    if(Object.keys(this.state.updates).length > 0) { update(this.state.updates); }
  }

  updateCard(e) { 
    // TODO animation here
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
 }

  showAnswer() {
      this.setState((state,props) => { return {showAnswer: true}; } );
  }

  comeBack() {
    // Animation so they know it is to reviewed
    // Do nothing if cardid is included
    if(this.props.reviews.includes(this.props.cardid)) { return; }
    saveForReview(this.props.cardid);
  }
  render() {
    return (
      //console.log('--- Test ---');
      //console.log(`Reviews length ${this.props.reviews.length}`);
      <div id="test" style={{position: 'relative'}} onClickCapture={this.allClicks}>
        <Test_QandA handleChange={this.handleChange} showAnswer={this.state.showAnswer} card={this.state.card} answer={this.state.answer} category={this.state.category} />
        <div
          style={{marginTop: 10, marginBottom: 10}}
          id="setdisplay"
        ></div>

        <Points />
        <RankModal show={false} />
        <div id="buttoncontrolgroup">
          <input type="button" name="show" onClick={this.showAnswer} value="Show"/>
          <input type="button" id="update" value="Update" onClick={this.updateCard}/>
          <input type="button" name="nailed" onClick={this.nextCard} value="Nailed it"/>
          <input type="button" name="whiffed" onClick={this.nextCard} value="Missed it"/>
          <input type="button" name="whiffed" onClick={this.previousCard} value="Previous"/>
          <input type="button" name="comeback" onClick={this.comeBack} value="Come back to this one!"/>
          <input type="button" name="review" onClick={this.props.review} value="Review" />
          <p id="questinfo">
        | Rating: <span id="rating">{this.props.timesRight + '/' + this.props.timesWrong}</span> |
        Card Number: <span id="cardid">{this.state.cardid}</span> |
  Questions To Review: <span>{this.props.reviews.length}</span>|
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
    index: state.index,
    timesRight: state.currentCard.times_right,
    timesWrong: state.currentCard.times_wrong,
    reviews: state.reviews,
    cardCount: state.cards.length
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    next: (result) => dispatch(nextCard(result)),
    update: (rates) => dispatch(updateCards(rates)),
    saveReviews: () => dispatch(saveReviews()),
    review: () => dispatch(review())
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
*/