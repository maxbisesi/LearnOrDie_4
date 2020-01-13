import React from "react";
//import './Galley.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Styles/Galley.css";
import GalleyQuestion from "./Presentational/GalleyQuestion";

class Galley extends React.Component {
  constructor(props) {
    super(props);
    console.log('Galley constructor');
    this.pageOneCards = [];

    this.state = { clickedQuestions: [] };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.addToClicked = this.addToClicked.bind(this);
    this.addToSet = this.addToSet.bind(this);
    //this.deleteSet = this.deleteSet(this);

    const pageone = props.cards.length >= 100 ? 100 : props.cards.length;

    for (let i = 0; i < pageone; i++) {
      let card = this.props.cards[i];
      this.pageOneCards.push(
        <GalleyQuestion
          addToClicked={this.addToClicked}
          key={card.cardid}
          cardid={card.cardid}
          card={card.card}
          category={card.category}
        />
      );
    }

    // create page two if necessary
    //if(pageone >= 100)
  }

  handleCardClick(e) {
    const clickedID = e.currentTarget.getAttribute("data-cardid");
    console.log(`Clicked ID current target: ${clickedID}`);
  }

  handleMouseEnter(e) {
    console.log("mouse enter");
  }

  addToClicked(id) {
    if (this.state.clickedQuestions.includes(id)) {
      console.log("Question removed");
      this.setState({
        clickedQuestions: this.state.clickedQuestions.filter(
          cardid => cardid !== id
        )
      });
    } else {
      console.log("Question added");
      this.setState({ clickedQuestions: [...this.state.clickedQuestions, id] });
    }
  }

  addToSet(e) {}

  render() {
    return (
      <div className="galley">
        <h1>{this.props.username}</h1>
        {/* Card Set creation */}
        <div>
          <ul className="galley-question_table">
              {this.pageOneCards}
          </ul>
        </div>

        <div className="galley-buttons-navigation">
          <input className="galley-button" type="button" value="<--" />
          <input className="galley-button" type="button" value="-->" />
          <input
            className="galley-button"
            type="button"
            value="Add To Set"
            onClick={this.addToSet}
          />
          <input className="galley-button" type="button" value="Delete" />
          <input className="galley-button" type="button" value="Add" />
          <input className="galley-button" type="button" value="Delete" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    username: state.user.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Galley);
