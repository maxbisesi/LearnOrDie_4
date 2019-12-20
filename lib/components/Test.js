import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";
import { rateCard, nextCard } from '../actions';
import Test_QandA from './Presentational/Test_QandA';
import Update_QandA from './Presentational/Update_QandA';

class Test extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      rating: [],
      update: false,
      showAnswer: false
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
  }

  nextCard(e) { 
    let result = e.target.name;

    this.setState((state,props) => { 
      state.rating.push({cardId:props.id, result:result});
      let ind = state.index;
      ind += 1;
      this.props.next(ind);
      return {index: ind};
    });

  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.index !== this.state.index) { return false; }
    return true;
  }

  showAnswer() {
      this.setState((state,props) => { return {showAnswer: true}; } );
  }

  render() {
    return (
      <div id="test" style={{position: 'relative'}}>
        { this.state.update ? <Update_QandA /> : <Test_QandA card={this.props.card} answer={this.showAnswer ? this.props.answer : "'click show'"} category={this.props.category} /> }
        <div
          style={{marginTop: 10, marginBottom: 10}}
          id="setdisplay"
        ></div>

        <div id="pointsdiv">
          <p className="pointsNormal" id="points"></p>
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
    category: state.currentCard.category
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    next: (index) => dispatch(nextCard(index))
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
