import React from "react";
import "../QuestionPageSheet.css";
import { connect } from "react-redux";
import { rateCard, nextCard } from '../../actions';

class Test_QandA extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);

    console.log(`Q AND A constructor props --> ${props.card} ${props.answer}`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  showAnswer(e) {
    // come up with something here

  }

  handleChange = ({ target }) => {
    let targ = target.name;
    if(targ === 'card'){ this.setState({ [target.name]: target.value }); }
    if(targ === 'answer'){ this.setState({ [target.name]: target.value }); }
    if(targ === 'category'){ this.setState({ [target.name]: target.value }); }
 };

 handleUpdate() {}

  render() {
    console.log(`Q AND A render state --> ${this.state.card} ${this.state.answer}`);
    return (
        <div id="areas">
          <textarea value={this.props.card} onChange={this.handleChange} rows="20" cols="50" name="card"></textarea>
          <textarea value={this.props.answer} onChange={this.handleChange} rows="20" cols="40" name="answer"></textarea>
          <input value={this.props.answer} onChange={this.handleChange} type="text" name="category" />
        </div>
    );
  }
}


export default Test_QandA;
