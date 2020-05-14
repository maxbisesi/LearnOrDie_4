import React, { useState } from "react";
// import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyQuestionStyle.css";
import classNames from "classnames";

export default function Galley(props) {
  const [clicked,setClicked] = useState(false);

  function questionClicked() {
    setClicked(click => !click); 
    props.addToClicked(props.cardid);
  }

  let btnClass = classNames({
    "galley-question": true,
    "galley-question-clicked": clicked || props.isClicked
  });

  return (
    <li
      className={btnClass}
      data-cardid={props.cardid}
      onClick={questionClicked}
    >
      {props.card} ({props.category})
    </li>
  );
}

