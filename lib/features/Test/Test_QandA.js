import React from "react";
//import "../QuestionPageSheet.css";
import { connect } from "react-redux";
import { rateCard, nextCard } from '../../redux/actions';

class Test_QandA extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    console.log(`--- Test_QandA ---`);
    return (

        <div id="areas">
          <textarea value={this.props.card} onChange={this.props.handleChange} rows="20" cols="50" name="card"></textarea>
          <textarea value={this.props.showAnswer ? this.props.answer : 'Click Show'} onChange={this.props.handleChange} rows="20" cols="40" name="answer"></textarea>
          <input value={this.props.category} onChange={this.props.handleChange} type="text" name="category" />
        </div>
    );
  }
}

export default Test_QandA;
