import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { filter, asyncDeleteCards,  asyncRenameCategory, newCollection, filterByCollections } from '../../Cards/cardSlice';
import CardCategory from './CardCategory';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Collection from './Collection';

export default function Home_Categories(){
  console.log('--- Home_Categories ---');
    const [checkedCats,setCheckedCats] = useState([]);
    const [checkedCollections,setCheckedCollections] = useState([]);
    const loggedIn = useSelector(state => state.userSlice.loggedIn);
    const dispatch = useDispatch();

    function checkCategory(event) { 
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

    function checkCollection(event) {
      //console.log(event.target.name);
      const colName = event.target.name;
      if(checkedCollections.includes(colName)) {
        setCheckedCollections((cols) => { 
          return cols.filter(col => col !== colName);
        });
      } else {
        return setCheckedCollections((cols) => [...cols,colName]);
      }
    }

    function renameCategory(oldCat) {
      let newCat = prompt(`Rename ${oldCat} category to?`);
      if(newCat == null || newCat == ''){
        return;
      }
      dispatch(asyncRenameCategory(newCat,oldCat));
    }

    function createCollection() {
      if( loggedIn == true) {
        let coll = prompt(`Collection Name: `);
        if(coll === null || coll === ''){
          return;
        }
        dispatch(newCollection({'name':coll}));
      } else { alert('Login to create Collections.'); }
    }

    // TODO sytle this table better
    let catList = <tr></tr>;
    let collectionList = <tr></tr>;

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
            checkCategory={checkCategory}
            renameCategory={renameCategory} />
        );
      });
    }

    // Add any collections that exist
    if( Object.keys(collections).length > 0 ) {
      collectionList = Object.entries(collections).map( (col) => {
        /* state.collections = 
        { 
          // entries.map -> col[0] 
          'AZURE': { // col[1]
            'azure:VM': [444,333,333], 
            'azure:fundamnetals': [43,23,90] 
          },

          'OCP': {
            'Collections': [223,567],
            'Exceptions': [78,99],
          }

        }
        */
       // This gives [ {'category':[cardid,cardid]}, {'category1':[cardid11,cardid22]} ]
        const catsInCollect = Object.entries(col[1]);
        return (
          <Collection 
              key={col[0]} 
              collectionName={col[0]} 
              categories={catsInCollect}
              checkCollection={checkCollection} />
        );
      });
    }

    return (
      <div>
        <input type="button" value="Filter" onClick={() => {
            if(checkedCats.length > 0) {dispatch(filter(checkedCats));}
            if(checkedCollections.length > 0) {dispatch(filterByCollections(checkedCollections));}
            if(checkedCats.length <= 0 && checkedCollections.length <= 0) { alert('Choose a category to filter by.'); }
        }} />
        <input type="button" value="Remove Filter" onClick={() => dispatch(filter('Remove'))} />
        <input type="button" value="Delete" onClick={() => {
            if( confirm('Are you want to permenantly delete all the quesitons of this category ?') === true) {
              // Delete from DB
              checkedCats.forEach( catname => dispatch(asyncDeleteCards(categories[catname])) );
            }
        }} />
        <input type="button" value="New Collection" onClick={createCollection} />
        <DndProvider backend={HTML5Backend}>
          <table className="home-table" >
            <tbody>
              <tr className="home-category_headers">
                <th>Category</th>
                <th>Card Count</th>
                <th> - </th>
              </tr>
              {collectionList}
              {catList}
            </tbody>
          </table>
        </DndProvider>
        </div>
    );
}


