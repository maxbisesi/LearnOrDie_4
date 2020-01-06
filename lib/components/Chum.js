import React from "react";
import axios from "axios";
//import "./QuestionPageSheet.css";
import PropTypes from "prop-types";
import { addCardAction } from '../actions';
import { connect } from 'react-redux';
import './Styles/Chum.css';

class Chum extends React.Component {
  constructor() {
    // TODO map state to props to pre populate category field with existing categories
    super();
    this.state = {
      card: "",
      answer: "",
      category: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.addCard({card:this.state.card, answer:this.state.answer, category:this.state.category});
    this.setState({ card: "", answer: "", category: "" });
  }

  handleChange(event) {
    if (event.target.name === "card") {
      this.setState({ card: event.target.value });
    } else if (event.target.name === "answer") {
      this.setState({ answer: event.target.value });
    } else if (event.target.name === "category") {
      this.setState({ category: event.target.value });
    }
  }

  render() {
    console.log('--- Chum ---');
    return (
      <div className="chum">
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea
              value={this.state.card}
              onChange={this.handleChange}
              name="card"
              rows="15"
              cols="65"
            ></textarea>
            <br />
            <textarea
              value={this.state.answer}
              onChange={this.handleChange}
              name="answer"
              rows="15"
              cols="65"
            ></textarea>
          </div>
          <br />
          <input type="hidden" name="name" value="submit" />
          <span>Category:</span>
          <input
            value={this.state.category}
            type="text"
            name="category"
            onChange={this.handleChange}
          />
          <input type="submit" name="submit" value="submit" id="submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ( {
    addCard: (card) => dispatch(addCardAction(card))
  } );
};
export default connect(null,mapDispatchToProps)(Chum);
