import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import ReactDOM from "react-dom";
import "../HomeScreenCustomSheet.css";

class Home_Categories extends React.Component {
  constructor(props) {
    super(props);
  }

  filterCategories(event) { 
    console.log('filter cats'); 
    // use this.setState to change the state of the controlled checkbox to checked !
  }

  render() {
    // TODO sytle this table better
    let catList = <tr></tr>;
    if( this.props.categories.length > 0 ) {
      const catList = this.props.categories.map((cat) => {
        return (
          <tr key={cat.catid}>
            <td>{cat.name}</td>
            <td>{cat.rating}</td>
            <td>{cat.count}</td>
            <td>
              <input
                type="checkbox"
                name="catFilterGroup"
                checked={cat.filter}
                onChange={this.filterCategories}
              />
            </td>
          </tr>
        );
      });
    }
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
            {catList}
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
    categories: state.categories
  };
};

export default connect(mapStateToProps)(Home_Categories);
