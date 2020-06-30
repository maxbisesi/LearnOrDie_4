import React from "react";
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../config';

export default function Collection(props){ 

    // Use catDrag as a ref in elements to hook up drag system
    const [, drop] = useDrop({
        accept: dragTypes.CAT,
        drop: itemDropped
      });
    // ----------------------------

    function itemDropped(item,monitor) {
        console.log('ITEM DROPPED');
        console.log(item.name);
    }
      
    return (
        <tr ref={drop} className="home-category" key={props.name}>
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