import React from "react";
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../config';
import classNames from "classnames";

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

    let collectionClass = classNames({
        "home-category": !isOver,
        "home-collection-over": isOver && canDrop,
        "home-collection-over-noDrop": isOver && !canDrop,
    });

    function itemDropped(item,monitor) {
        console.log('ITEM DROPPED');
        console.log(item.name);
    }
      
    return (
        <tr ref={drop} className={collectionClass} key={props.name}>
            <td colSpan="2">{props.name}</td>
            <td>
                <input
                    name={props.name}
                    type="checkbox"
                    onChange={() => console.log('collection checked !')}
                />
            </td>
        </tr>
    );

}