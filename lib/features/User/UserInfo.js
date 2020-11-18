import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import BucketBrigade from "./ensignia/BucketBrigade";
import CageMaster from "./ensignia/CageMaster";
import FreeDiver from "./ensignia/FreeDiver";
import Harpoonist from "./ensignia/Harpoonist";
import Recruit from "./ensignia/Recruit";
import TheBitten from "./ensignia/TheBitten";
import './ProfileStyle.css';

export default function UserInfo(){
    const { user_id,username,email,points,userrank} = useSelector( state => state.userSlice.user, shallowEqual );
    
    function renderRank(rank) {
      switch (rank) {
        case "Guest":
          return 'none';
        case "Recruit":
          return <Recruit />;
        case "Bucket Brigade":
          return <BucketBrigade />;
        case "Harpoonist":
          return <Harpoonist />;
        case "FreeDiver":
          return <FreeDiver />;
        case "CageMaster":
          return <CageMaster />;
        case "The Bitten":
          return <TheBitten />;
        case "Great White":
          throw new Error(" havent drawn it yet");
        default:
          return null;
      }
    }

    const emblem = renderRank(userrank);

    return (
      <div className="profile-bio">
        <span className="profile-bio-cell"><u>username:</u><span id="profileusername">{username}</span></span>
        <span className="profile-bio-cell"><u>email:</u><span id="profileemail">{email}</span></span>
        <span className="profile-bio-cell"><u>rank:</u><span id="profilerank">{userrank}</span></span>
        <span className="profile-bio-cell"><u>points:</u><span id="profilepoints">{points}</span></span>
        <div id="profilerankemblem" className="profile-rank">{emblem}</div>
      </div>
    );
}

