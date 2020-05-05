import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { filter } from '../../Cards/cardSlice';

export default function Home_Categories(){
    const [checkedCats,setCheckedCats] = useState([]);
    const dispatch = useDispatch();

    function filterCategories(event) { 
      //console.log(event.target.name);
      const catName = event.target.name;
      if(checkedCats.includes(catName)) {
        setCheckedCats((cats) => { 
          return cats.filter(categ => categ !== catName);
        });
      } else {
        return setCheckedCats((cats) => [...cats,catName]);
      }
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
          <tr className="home-categories" key={cat[0]}>
            <td>{cat[0]}</td>
            <td>{cat[1]}</td>
            <td>
              <input
                name={cat[0]}
                type="checkbox"
                onChange={filterCategories}
              />
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <input type="button" value="Filter" onClick={() => dispatch(filter(checkedCats))} />
        <input type="button" value="Remove Filter" onClick={() => dispatch(filter('Remove'))} />
        <table className="home-table" >
          <tbody>
            <tr className="home-category_headers">
              <th>Category</th>
              <th>Card Count</th>
              <th>Filter Quesitons by Category</th>
            </tr>
            {catList}
          </tbody>
        </table>
      </div>
    );
}


