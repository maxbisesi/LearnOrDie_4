import React from "react";
import './RankModalStyle.css';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import BucketBrigade from './ensignia/BucketBrigade';
import Recruit from './ensignia/Recruit';
import CageMaster from './ensignia/CageMaster';
import FreeDiver from './ensignia/FreeDiver';
import TheBitten from './ensignia/TheBitten';
import Harpoonist from './ensignia/Harpoonist';

import { config } from '../../config';

export default function RankModal(props) {
  console.log(`--- RankModal ---`);
  const {user_id, userName, firstName, lastName, email, totalPoints, cardCount, rank } = useSelector( state => state.userSlice.user );
  let ensignia;
  let message;

  switch(rank) {
    case `Recruit`: 
      ensignia = <Recruit />; 
      message = config.recruit;
      break;
    case `BucketBrigade`: 
      ensignia = <BucketBrigade />; 
      message = config.bucketbrigade;
      break;
    case `Harpoonist`: 
      ensignia = <Harpoonist/>; 
      message = config.harpoonist;
      break;
    case `FreeDiver`: 
      ensignia = <FreeDiver />;
      message = config.freediver; 
      break;
    case `CageMaster`: 
      ensignia = <CageMaster />; 
      message = config.cagemaster;
      break;
    case `TheBitten`: 
      ensignia = <TheBitten/>;
      message = config.thebitten; 
      break;
    case `GreatWhite`: throw new Error('RankModal: GW not yet implemented');
    default: throw new Error('RankModal: unknown rank.');
  }

  return (
      <div className="rankModal-container"> 
        <div className="rankModal-content">
          <span onClick={( e ) => props.setShowPopup(false)} className="rankModal-close">&times;</span>
          <p className="rankModal-message"> {message} </p>
          <div className="rankModal-ensignia-container">
            {ensignia}
          </div>
        </div>
      </div>
  );
}


