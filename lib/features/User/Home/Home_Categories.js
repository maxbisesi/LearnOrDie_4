import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { filter, asyncDeleteCards,  asyncRenameCategory } from '../../Cards/cardSlice';

export default function Home_Categories(){
  console.log('--- Home_Categories ---');
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

    function renameCategory(oldCat) {
      let newCat = prompt(`Rename ${oldCat} category to?`);
      if(newCat == null || newCat == ''){
        return;
      }
      dispatch(asyncRenameCategory(newCat,oldCat));
    }

    // TODO sytle this table better
    let catList = <tr></tr>;
    
    const categories = useSelector(state => state.cardSlice.categories, shallowEqual);

    // if there are new categories display them.
    if( Object.keys(categories).length > 0 ) {
        // [key, value]
      catList = Object.entries(categories).map( (cat) => {
        return (
          <tr className="home-categories" key={cat[0]}>
            <td className="home-category-boxName" onClick={
              (e) => renameCategory(e.target.textContent)
              }>
                {cat[0]}
            </td>
            <td>{cat[1].length}</td>
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
        <input type="button" value="Filter" onClick={() => {
            if(checkedCats.length > 0) {dispatch(filter(checkedCats));}
            else { alert('Choose a category to filter by.'); }
        }} />
        <input type="button" value="Remove Filter" onClick={() => dispatch(filter('Remove'))} />
        <input type="button" value="Delete" onClick={() => {
            if( confirm('Are you want to permenantly delete all the quesitons of this category ?') === true) {
              // Delete from DB
              checkedCats.forEach( catname => dispatch(asyncDeleteCards(categories[catname])) );
            }
        }} />
        <input type="button" value="New Collection" />
        <table className="home-table" >
          <tbody>
            <tr className="home-category_headers">
              <th>Category</th>
              <th>Card Count</th>
              <th> - </th>
            </tr>
            {catList}
          </tbody>
        </table>
      </div>
    );
}


