import React from 'react';
//import './Galley.css';
import '../Styles/GalleyQuestion.css';
import classNames from 'classnames';

class GalleyQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };

    this.questionClicked = this.questionClicked.bind(this);
  }

  questionClicked() {
    this.setState((state) => ({
      isClicked: !state.isClicked
    }));
    this.props.addToClicked(this.props.cardid); 
  }

  render() {
    let btnClass = classNames({
      'galley-question': true,
      'galley-question-clicked': this.state.isClicked
    });

    return (
      <tr
        className={btnClass}
        data-cardid={this.props.cardid}
        onClick={this.questionClicked}
        onMouseEnter={this.handleMouseEnter}
      >
        <td>{this.props.card}</td>
        <td>{this.props.category}</td>
        <td>{this.props.times_right}</td>
        <td>{this.props.times_wrong}</td>
      </tr>
    );
  }
}
export default GalleyQuestion;
