import React,{ useState } from "react";
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../config';
import classNames from "classnames";
import { asyncAddCategoryToCollection, asyncRemoveCategoryFromCollection } from '../../Cards/cardSlice';
import { useDispatch } from 'react-redux';

export default function Collection(props){ 

    // Use catDrag as a ref in elements to hook up drag system
    const [{isOver, canDrop}, drop] = useDrop({
        accept: dragTypes.CAT,
        drop: itemDropped,
        collect: (mon)=>({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop()
        })
      });
    // ----------------------------

    const dispatch = useDispatch();
    const [displayCategories,setDisplayCategories] = useState(false);

    let collectionClass = classNames({
        "home-collection": !isOver,
        "home-collection-over": isOver && canDrop,
        "home-collection-over-noDrop": isOver && !canDrop,
    });

    function itemDropped(item) {
        console.log(item.name);
        let colName = props.collectionName;
        let catName = item.name;
        if(props.loggedIn === true) {dispatch(asyncAddCategoryToCollection(colName,catName));}
        else { alert('Please login first.'); }
    }

    function removeCategory(category) {
        let colName = props.collectionName;
        if(props.loggedIn === true) { dispatch(asyncRemoveCategoryFromCollection(colName,category)); }
        else { alert('Login first.');}
    }

    // This gives [ {'category':[cardid,cardid]}, {'category1':[cardid11,cardid22]} ]
    let catlist = props.categories.map(
        (cat) => {
            // cat[0] = 'category'
            // cat[1] = [11,22,33]
            return (
                <tr key={cat[0]}>
                    <td className="home-collection-category" colSpan="2">
                        {cat[0]}  -   {cat[1].length} - <span onClick={() => removeCategory(cat[0])} className="home-collection-removecategory">remove from collection</span>
                    </td>
                </tr>
            );  
        }
    );

    return (
        <>
        <tr ref={drop} className={collectionClass} key={props.collectionName}>
            <td colSpan="2">
                <span className="home-collection-expand" onClick={() => setDisplayCategories(!displayCategories)}>
                    {displayCategories ? '^' : '>'}
                </span>
                <span className="home-collection-name">{props.collectionName}</span>
            </td>
            <td>
                <input
                    name={props.collectionName}
                    type="checkbox"
                    onChange={props.checkCollection}
                />
            </td>
        </tr>
        {displayCategories ? catlist : null}
        </>
    );

}