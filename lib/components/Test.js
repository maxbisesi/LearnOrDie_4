import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: 0,
      card: "",
      answer: "",
      category: "",
    };

    this.showAnswer = this.showAnswer.bind(this);
    this.nextCard = this.nextCard.bind(this);
  }

  showAnswer(e) {
    this.setState((state,props) => ({answer: props.cards[this.state.currentCard].answer}) );
  }

  nextCard(e) { 
    if(e.target.name === 'nailedit') {
      console.log('nailed it');
    } else if( e.target.name === 'missedit') {
      console.log('missed it');
    }

    this.setState((state,props) => {
      return {
        currentCard: state.currentCard +1,
        card: props.cards[state.currentCard].card,
        answer: "",
        category: props.cards[state.currentCard].category 
      };
    });
    console.log(this.state);
  }

  previousCard() { 

  }

  render() {
    return (
      <div id="test" style={{position: 'relative'}}>
        <div id="areas">
          <textarea readOnly value={this.state.card} rows="20" cols="50" id="cardArea"></textarea>
          <textarea readOnly value={this.state.answer} rows="20" cols="40" id="answerArea"></textarea>
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
          <input type="button" name="missedit" onClick={this.nextCard} value="Missed it"/>
          <input type="button" name="missedit" onClick={this.previousCard} value="Previous"/>
          <input type="button" id="comebacktothisone" value="Come back to this one!"/>
          <input type="button" id="review" value="Review" />
          <p id="questinfo">
            | Rating: <span id="rating"></span> | Category:{" "}
            <span id="cat">{this.state.category} </span> | Card Number: <span id="cardid"></span> |
            Questions To Review: <span id="reviewcount"></span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
