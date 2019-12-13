import React from "react";
import axios from "axios";
import './QuestionPageSheet.css';
import PropTypes from 'prop-types';

class Chum extends React.Component {
  constructor() {
    super();
    console.log('Chum component');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    
  }

  render() {
    return (
      <div id="chum">
        <form id="chumForm" onSubmit={this.handleSubmit} method="POST">
          <div>
            <textarea id="chumCard" name="card" rows="15" cols="65"></textarea>
            <br />
            <textarea
              id="chumAnswer"
              name="answer"
              rows="15"
              cols="65"
            ></textarea>
          </div>
          <div className="rightsidegraph">
            <img
              id="chumgraphic"
              src="./fcs1.svg"
              height="500px"
              width="250px"
            />
          </div>
          <br />
          <input type="hidden" name="name" value="submit" />
          <span>Category:</span>
          <input id="chumCategory" type="text" name="cat" />
          <input type="submit" name="submit" value="submit" id="submit" />
        </form>
      </div>
    );
  }
}  
export default Chum;
