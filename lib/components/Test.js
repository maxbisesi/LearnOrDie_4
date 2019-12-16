import React from "react";
import "./QuestionPageSheet.css";
import { connect } from "react-redux";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="test" style={{position: 'relative'}}>
        <div id="areas">
          <textarea rows="20" cols="50" id="cardArea"></textarea>
          <textarea rows="20" cols="40" id="answerArea"></textarea>
        </div>

        <div
          style={{marginTop: 10, marginBottom: 10}}
          id="setdisplay"
        ></div>

        <div id="pointsdiv">
          <p className="pointsNormal" id="points"></p>
        </div>

        <div id="buttoncontrolgroup">
          <button id="show">Show</button>
          <button id="update">Update</button>
          <button id="nailedit">Nailed it</button>
          <button id="missedit">Missed it</button>
          <button id="comebacktothisone">Come back to this one!</button>
          <button id="review">Review</button>
          <p id="questinfo">
            | Rating: <span id="rating"></span> | Category:{" "}
            <span id="cat"> </span> | Card Number: <span id="cardid"></span> |
            Questions To Review: <span id="reviewcount"></span>
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categoryNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return ( {
    next: () => 
  } );
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);
