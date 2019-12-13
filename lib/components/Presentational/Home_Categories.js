import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../HomeScreenCustomSheet.css';

class Home_Categories extends React.Component {
  constructor() {
      super();
      // https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
  }

  render() {
    return (
        <div className="standardtable">
        <table id="categorytable">
          <tbody>
            <tr id="headers">
              <th>Category</th>
              <th>Right / Wrong</th>
              <th>Card Count</th>
              <th>Filter Quesitons by Category</th>
            </tr>
            <tr>
              <td>category name</td>
              <td>category right / wrong</td>
              <td>count</td>
              <td>
                <input
                  type="checkbox"
                  name="catFilterGroup"
                  value=" check or nah"
                  defaultChecked={false}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="button" id="filterbutton" value="Filter" />
        <input type="button" id="unfilterbutton" value="Remove Filter" />
      </div>
    );
  }
}

const mapStateToProps = (state) => { 
  return { 
    
  };
};

export default connect(mapStateToProps)(Home_Categories);