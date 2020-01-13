import React from "react";
//import './Galley.css';
import "../Styles/GalleyQuestion.css";
import classNames from "classnames";

class GalleyQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };

    this.questionClicked = this.questionClicked.bind(this);
  }

  questionClicked() {
    this.setState(state => ({
      isClicked: !state.isClicked
    }));
    this.props.addToClicked(this.props.cardid);
  }

  render() {
    let btnClass = classNames({
      "galley-question": true,
      "galley-question-clicked": this.state.isClicked
    });

    return (
      <li
        className={btnClass}
        data-cardid={this.props.cardid}
        onClick={this.questionClicked}
        onMouseEnter={this.handleMouseEnter}
      >
        {this.props.card} ({this.props.category})
      </li>
    );
  }
}
export default GalleyQuestion;
