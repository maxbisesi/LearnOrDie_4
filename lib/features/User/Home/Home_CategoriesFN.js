import React from "react";
import { useSelector, shallowEqual } from 'react-redux';

export default function Home_Categories(){

    function filterCategories(event) { 
        console.log('filter cats'); 
        // use this.setState to change the state of the controlled checkbox to checked !
    }

    console.log('--- Home_Categories ---');
    // TODO sytle this table better
    let catList = <tr></tr>;
    
    const categories = useSelector(state => state.cardSlice.categories, shallowEqual);

    // if there are new categories display them.
    if( Object.keys(categories).length > 0 ) {
        // [key, value]
      catList = Object.entries(categories).map((cat) => {
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
                onChange={filterCategories}
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


