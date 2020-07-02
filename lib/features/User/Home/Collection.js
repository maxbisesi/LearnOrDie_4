import React,{ useState } from "react";
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../config';
import classNames from "classnames";
import { asyncAddCategoryToCollection } from '../../Cards/cardSlice';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

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
    const[categories,setCategories] = useState([]);
    const [displayCategories,setDisplayCategories] = useState(false);

    let collectionClass = classNames({
        "home-collection": !isOver,
        "home-collection-over": isOver && canDrop,
        "home-collection-over-noDrop": isOver && !canDrop,
    });

    function itemDropped(item,monitor) {
        console.log(item.name);
        let colName = props.collectionName;
        let catName = item.name;

        // if category already exists ignore
        if(categories.includes(catName)) { 
            alert(`Collection already contains ${catName}`); 
        } else {
            setCategories((cats) => { return [...cats, catName]; });
        }
        console.log(`categories: ${categories}`);
        dispatch(asyncAddCategoryToCollection(colName,catName));
    }

    let catlist = categories.map(cat => <td className="home-collection-category" key={cat}>{cat}</td>);

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
                    onChange={() => console.log('collection checked !')}
                />
            </td>
        </tr>
        {displayCategories ? <tr>{catlist}</tr> : null}
        </>
    );

}