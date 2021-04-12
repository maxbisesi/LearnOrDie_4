import React, { useState, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { filter, asyncDeleteCards,  asyncRenameCategory, newCollection, asyncAddCategoryToCollection, deleteGuestCards, fillCollections, fillCategories } from '../../Cards/cardSlice';
import CardCategory from './CardCategory';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Collection from './Collection';
import gsap from 'gsap';

export default function Home_Categories() {
    console.log('--- Home_Categories ---');

    const [checkedCats,setCheckedCats] = useState([]);
    const [checkedCollections,setCheckedCollections] = useState([]);
    const user = useSelector(state => state.userSlice.user);
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
        let coll = prompt(`Any Categories currently checked will be added to this Collection!\nCollection Name: `);
        if(coll === null || coll === ''){
          return;
        }
        
        // If there is already a collection named that 
        // Notify the user
        if(Object.keys(collections).includes(coll)) {
          alert(`${coll} is already a Collection. Use the existing one.`);
          return;
        }

        dispatch(newCollection({ 'name':coll }));
        // asyncAddCategoryToCollection(collection,category)
        for(let cc=0; cc < checkedCats.length; cc++) {
          dispatch(asyncAddCategoryToCollection(coll,checkedCats[cc]));
        }
        setCheckedCats([]);
      } else { alert('Login to create Collections.'); }
    }

    // TODO sytle this table better
    let catList = <tr></tr>;
    let collectionList = <tr></tr>;

    const categories = useSelector(state => state.cardSlice.categories, shallowEqual);
    const collections = useSelector(state => state.cardSlice.collections, shallowEqual);
    const cardCount = useSelector(state => state.cardSlice.cardCount);

    // if there are new categories display them.
    if( Object.keys(categories).length > 0 ) {
      // [key, value]
      catList = Object.entries(categories).map( (cat) => {
        if(cat['DELETED'] === true) {
          return null;
        }
        return (
          <CardCategory 
            key={cat[0]} 
            name={cat[0]} 
            count={cat[1].length} 
            checkCategory={checkCategory}
            renameCategory={renameCategory} />
        );

      });
      catList = catList.filter( elm => elm !== null);
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
         removeanim.timeScale(2);
         removeanim.play();
      } else {
        if(checkedCats.length > 0 || checkedCollections.length > 0) {
          dispatch(filter({'categories':checkedCats,'collections':checkedCollections}));
          let filterTL = gsap.timeline();
          filterTL.to(questionsFiltered.current,{duration:2.5,opacity:1,fontSize:34})
            .to(questionsFiltered.current,{duration:2,opacity:0})
            .to(questionsFiltered.current,{duration:.5,fontSize:15});
          filterTL.timeScale(2.5);
          filterTL.play();
          setCheckedCollections([]);
          setCheckedCats([]);
        } else {
          alert('Nothing to filter.');
        }
      }
    }

    function deleteSomething() {
      // You can't delete a Collection when it has categories in it still
      if(checkedCollections.length > 0) {
        alert(`You can't delete a Collection that still has Categories.`);
        return;
      }

      if(checkedCats.length > 0) {
        if(confirm('Are you sure you want to permenantly delete all the questions in these categories ?') === true){
            if(user.user_id === 'GUESTID' || loggedIn === false) {
              dispatch(deleteGuestCards(checkedCats));
              dispatch(fillCollections());
              dispatch(fillCategories());
            } else {
              let deleteCards = [];
              for(let c = 0; c < checkedCats.length; c++) {
                console.log(`deleting: ${checkedCats[c]}`);
                categories[checkedCats[c]].forEach( (id) => {
                  deleteCards.push(id);
                });
              }
              dispatch(asyncDeleteCards(deleteCards));
          }
          setCheckedCats([]);
        }
      } else {
        alert('Nothing to delete.');
      }
    }

    return (
      <div className="home-categories">
        <div className="home-category_buttons">
          <input id="filterbutton" className="home-button" type="button" value="Filter" onClick={filterAndAnimate}/>
          <input id="removefilterbutton" className="home-button" type="button" value="Remove Filter" onClick={() => filterAndAnimate('Remove')} />
          <input id="deletebutton" className="home-button" type="button" value="Delete" onClick={deleteSomething} />
          <input id="newcollectionbutton"  className="home-button" type="button" value="New Collection" onClick={createCollection} />
          {/*<span id="totalCount" className="home-total">Total: {cardCount}</span>*/}
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


