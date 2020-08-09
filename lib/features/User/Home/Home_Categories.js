import React, { useState, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { filter, asyncDeleteCards,  asyncRenameCategory, newCollection } from '../../Cards/cardSlice';
import CardCategory from './CardCategory';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Collection from './Collection';
import gsap from 'gsap';

export default function Home_Categories(){
  console.log('--- Home_Categories ---');
    const [checkedCats,setCheckedCats] = useState([]);
    const [checkedCollections,setCheckedCollections] = useState([]);
    const loggedIn = useSelector(state => state.userSlice.loggedIn);
    const dispatch = useDispatch();
    
    const questionsFiltered = useRef(null);
    const filterRemoved = useRef(null);

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
      if( loggedIn == true ) {
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
              loggedIn={loggedIn}
              checkCollection={checkCollection} />
        );
      });
    }

    function filterAndAnimate(remove) {
      if(remove === 'Remove') {
        dispatch(filter('Remove'));
        let removeanim = gsap.timeline();
        removeanim.to(filterRemoved.current,{duration:2,opacity:1})
         .to(filterRemoved.current,{duration:2,color:"#FB9F48"})
         .to(filterRemoved.current,{duration:1,color:"#FD5050"})
         .to(filterRemoved.current,{duration:3,opacity:0});
         removeanim.play();
      } else {
        dispatch(filter({'categories':checkedCats,'collections':checkedCollections}));
        let filterTL = gsap.timeline();
        filterTL.to(questionsFiltered.current,{duration:2.5,opacity:1,fontSize:34})
          .to(questionsFiltered.current,{duration:2,opacity:0})
          .to(questionsFiltered.current,{duration:.5,fontSize:15});
        filterTL.timeScale(2.5);
        filterTL.play();
      }
    }

    return (
      <div className="home-categories">
        <div className="home-category_buttons">
          <input className="home-button" type="button" value="Filter" onClick={filterAndAnimate}/>
          <input className="home-button" type="button" value="Remove Filter" onClick={() => filterAndAnimate('Remove')} />
          <input className="home-button" type="button" value="Delete" onClick={() => {
              if( confirm('Are you want to permenantly delete all the quesitons of this category ?') === true) {
                // Delete from DB
                checkedCats.forEach( catname => dispatch(asyncDeleteCards(categories[catname])) );
              }
          }} />
          <input className="home-button" type="button" value="New Collection" onClick={createCollection} />
          <span className="home-category_filtered-animation" ref={questionsFiltered}><i><b>Questions Filtered!</b></i></span>
          <span className="home-category_removed-animation" ref={filterRemoved}><b>REMOVED</b></span>
        </div>
        <DndProvider backend={HTML5Backend}>
          <table className="home-categories-table" >
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


