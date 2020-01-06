import React from "react";
import { connect } from "react-redux";

class Home_Categories extends React.Component {
  constructor(props) {
    super(props);
  }

  filterCategories(event) { 
    console.log('filter cats'); 
    // use this.setState to change the state of the controlled checkbox to checked !
  }

  render() {
    console.log('--- Home_Categories ---');
    // TODO sytle this table better
    let catList = <tr></tr>;
    
    // if there are new categories display them.
    if( Object.keys(this.props.categories).length > 0 ) {
      catList = Object.entries(this.props.categories).map((cat) => {
        return (
          <tr key={cat[0]}>
            <td>{cat[0]}</td>
            <td>cat.rating</td>
            <td>{cat[1]}</td>
            <td>
              <input
                type="checkbox"
                name="catFilterGroup"
                checked={false} //{cat.filter}
                onChange={this.filterCategories}
              />
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <table className="home-table" >
          <tbody>
            <tr className="home-category_headers">
              <th>Category</th>
              <th>Right / Wrong</th>
              <th>Card Count</th>
              <th>Filter Quesitons by Category</th>
            </tr>
            {catList}
          </tbody>
        </table>
        <input type="button" value="Filter" />
        <input type="button" value="Remove Filter" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoryNames,
  };
};

export default connect(mapStateToProps)(Home_Categories);
