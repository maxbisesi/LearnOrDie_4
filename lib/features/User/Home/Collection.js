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


    let collectionClass = classNames({
        "home-collection": !isOver,
        "home-collection-over": isOver && canDrop,
        "home-collection-over-noDrop": isOver && !canDrop,
    });

    function itemDropped(item,monitor) {
        console.log('ITEM DROPPED');
        console.log(item.name);
        let colName = props.collectionName;
        let catName = item.name;
        console.log(`Change requested: ${colName} - ${catName}`);
        dispatch(asyncAddCategoryToCollection(colName,catName));
    }

    return (
        <tr ref={drop} className={collectionClass} key={props.collectionName}>
            <td colSpan="2">{props.collectionName}</td>
            <td>
                <input
                    name={props.collectionName}
                    type="checkbox"
                    onChange={() => console.log('collection checked !')}
                />
            </td>
        </tr>
    );

}