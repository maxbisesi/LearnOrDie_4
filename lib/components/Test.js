import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";
import { rateCard, nextCard } from '../actions';

class Test extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      index: 0,
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
  }

  showAnswer(e) {
    this.setState((state,props) => ({answer: props.cards[this.state.currentCard].answer}) );
  }

  nextCard(e) { 
    if(e.target.name === 'nailedit') {
      this.props.rateCard(this.state.index,'nailed');
    } else if( e.target.name === 'whiffed') {
      this.props.rateCard(this.state.index,'whiffed');
    }

    this.setState((state,props) => { 
      let ind = state.index;
      ++ind;
      this.props.nextCard(ind);
      return { index: ind };
    });

  }

  previousCard() { 

  }

  render() {
    return (
      <div id="test" style={{position: 'relative'}}>
        <div id="areas">
          <textarea readOnly value={this.props.currentCard.card} rows="20" cols="50" id="cardArea"></textarea>
          <textarea readOnly value={this.props.currentCard.answer} rows="20" cols="40" id="answerArea"></textarea>
        </div>

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
            Category:{" "}<span id="cat">{this.props.currentCard.category} </span> | 
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
    currentCard: state.currentCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    next: (index) => dispatch(nextCard(index)),
    rate: (index,result) => dispatch(rateCard(index,result))
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
