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
        let catCount = item.count;

        // if category already exists ignore
        if(categories.some(cat => cat.name === catName)) { 
            alert(`Collection already contains ${catName}`); 
        } else {
            let newCat = {'name':catName,'count':catCount};
            setCategories((cats) => { return [...cats, newCat]; });
        }

        dispatch(asyncAddCategoryToCollection(colName,catName));
    }

    let catlist = categories.map(
        (cat) => {
            return (
                <tr key={cat.name}>
                    <div className="home-collection-category">
                        <td colSpan="2">
                            {cat.name}  -   {cat.count}
                        </td>
                    </div>
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
                    onChange={() => console.log('collection checked !')}
                />
            </td>
        </tr>
        {displayCategories ? catlist : null}
        </>
    );

}