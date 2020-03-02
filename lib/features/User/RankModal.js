import React from "react";
import './RankModalStyle.css';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

export default function RankModal(props) {
  console.log(`--- RankModal ---`);
  const user = useSelector( state => state.userSlice.user);
  return (
      <div className="rankModal-container"> 
        <div className="rankModal-content">
          <span onClick={( e ) => props.setShowPopup(false)} className="rankModal-close">&times;</span>
          <p> YOU EARNED a NEW RANK!</p>
        </div>
      </div>
  );
}
