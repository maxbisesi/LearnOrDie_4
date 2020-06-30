import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { filter, asyncDeleteCards,  asyncRenameCategory, addCollection } from '../../Cards/cardSlice';
import CardCategory from './CardCategory';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Collection from './Collection';

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

    function newCollection() {
      let coll = prompt(`Collection Name: `);
      if(coll === null || coll === ''){
        return;
      }
      console.log(`collection name ${coll}`);
      dispatch(addCollection({'name':coll}));
    }

    // TODO sytle this table better
    let catList = <tr></tr>;
    
    const categories = useSelector(state => state.cardSlice.categories, shallowEqual);
    const collections = useSelector(state => state.cardSlice.collections, shallowEqual);

    // if there are new categories display them.
    if( Object.keys(categories).length > 0 ) {
        // [key, value]
      catList = Object.entries(categories).map( (cat) => {
        return (
          <CardCategory 
            key={cat[0]} 
            name={cat[0]} 
            count={cat[1].length} 
            filterCategories={filterCategories}
            renameCategory={renameCategory} />
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
        <input type="button" value="New Collection" onClick={newCollection} />
        <DndProvider backend={HTML5Backend}>
          <table className="home-table" >
            <tbody>
              <tr className="home-category_headers">
                <th>Category</th>
                <th>Card Count</th>
                <th> - </th>
              </tr>
              {catList}
              <Collection name="dropbox" />
            </tbody>
          </table>
          
        </DndProvider>
        </div>
    );
}


