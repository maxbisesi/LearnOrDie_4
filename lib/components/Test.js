import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";
import { rateCards, nextCard } from '../actions';

class Test extends React.Component {
  constructor(props) {
    super(props);
    console.log('test');
    this.state = {
      index: 0,
      rating: []
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
      state.rating.push({cardId:state.index, result:result});
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

  componentWillUnmount(){
    // update store with this session
    this.props.rate(this.state.rating);
    this.props.next(0);
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
    next: (index) => dispatch(nextCard(index)),
    rate: (rates) => dispatch(rateCards(rates))
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
