import React from "react";
// import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyQuestionStyle.css";
import classNames from "classnames";

export default function GalleyQuestion(props) {
  console.log(`--- GalleyQuestion ---`);
  
  function questionClicked() {
    props.addToClicked(props.cardid);
  }

  let btnClass = classNames({
    "galley-question": true,
    "galley-question-clicked": props.wasClicked && !props.hasBeenDeleted,
    "galley-question-deleted": props.hasBeenDeleted
  });

  return (
    <li
      className={btnClass}
      data-cardid={props.cardid}
      onClick={questionClicked}
    >
      <span id={`galleyquestion_${props.card_id}`} className="galley-question-card_id">{props.card_id}</span> {props.card} ({props.category})
    </li>
  );
}

