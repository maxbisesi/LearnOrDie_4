import React from "react";
import axios from "axios";
//import "./QuestionPageSheet.css";
import PropTypes from "prop-types";
import { addCardAction } from '../actions';
import { connect } from 'react-redux';
import './Styles/Chum.css';

export class Chum extends React.Component {
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
    console.log(`State in handleSubmit, before ${JSON.stringify(this.state)}`);
    const cardAdded = {'card': this.state.card, 'answer': this.state.answer, 'category': this.state.category};
    
    this.setState( 
      (state,props) => ({ card: "", answer: "", category: "" }),
      () => { 
        console.log(`State in handleSubmit, setState callback: ${JSON.stringify(this.state)}`);
        this.props.addCard(cardAdded); 
        console.log(`Card Added: ${JSON.stringify(cardAdded)}`);
      }
    );
  }

  handleChange(event) {
    const name = event.target.name;
    const val = event.target.value;
    // console.log(`name and val ${name} = ${val}`);
    if (name === "card") {
      this.setState((state,props) => ({ 'card': val }) );
    } else if (name === "answer") {
      this.setState((state,props) => ({ 'answer': val }) );
    } else if (name === "category") {
      this.setState((state,props) => ({ 'category': val }) );
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
