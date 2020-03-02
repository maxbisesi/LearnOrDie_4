import React from "react";
import './RankModalStyle.css';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import BucketBrigade from './ensignia/BucketBrigade';
import Recruit from './ensignia/Recruit';
import CageMaster from './ensignia/CageMaster';
import FreeDiver from './ensignia/FreeDiver';
import TheBitten from './ensignia/TheBitten';
import Harpoonist from './ensignia/Harpoonist';

export default function RankModal(props) {
  console.log(`--- RankModal ---`);
  const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank } = useSelector( state => state.userSlice.user);
  let ensignia;
  switch(rank) {
    case `Recruit`: ensignia = <Recruit />; break;
    case `BucketBrigade`: ensignia = <BucketBrigade />; break;
    case `Harpoonist`: ensignia = <Harpoonist/>; break;
    case `FreeDiver`: ensignia = <FreeDiver />; break;
    case `CageMaster`: ensignia = <CageMaster />; break;
    case `TheBitten`: ensignia = <TheBitten/>; break;
    case `GreatWhite`: throw new Error('RankModal: GW not yet implemented');
    default: throw new Error('RankModal: unknown rank.');
  }

  return (
      <div className="rankModal-container"> 
        <div className="rankModal-content">
          <span onClick={( e ) => props.setShowPopup(false)} className="rankModal-close">&times;</span>
          <p> YOU EARNED a NEW RANK!</p>
          {ensignia}
        </div>
      </div>
  );
}


