import React from "react";
import { useDrag } from 'react-dnd';
import { dragTypes } from '../../../config';
import classNames from "classnames";

export default function CardCategory(props){ 

    // Use catDrag as a ref in elements to hook up drag system
    const [{ isDragged }, catDrag] = useDrag({
        item: { type: dragTypes.CAT, name: props.name, count: props.count },
        collect: (monitor) => ({
            isDragged: !!monitor.isDragging(),
        })
    });
    // ----------------------------

    return (
        <tr ref={catDrag} className="home-category" key={props.name}>
            <td className="home-category-boxName" onClick={
                (e) => props.renameCategory(e.target.textContent)
            }>
                {props.name}
            </td>
            <td>{props.count}</td>
            <td>
                <input
                name={props.name}
                type="checkbox"
                onChange={props.filterCategories}
            />
            </td>
        </tr>
    );

}