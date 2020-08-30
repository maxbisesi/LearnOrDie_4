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

    const userRank = renderRank(userrank);
    console.log(`rank: ${userRank}`);
    return (
      <div className="profile-bio">
        <span className="profile-bio-cell"><u>username:</u>{username}</span>
        <span className="profile-bio-cell"><u>email:</u>{email}</span>
        <span className="profile-bio-cell"><u>rank:</u>{userrank}</span>
        <span className="profile-bio-cell"><u>points:</u>{points}</span>
        <div id="profilerank" className="profile-rank">{userRank}</div>
      </div>
    );
}

