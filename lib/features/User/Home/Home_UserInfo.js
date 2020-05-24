import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import BucketBrigade from "../ensignia/BucketBrigade";
import CageMaster from "../ensignia/CageMaster";
import FreeDiver from "../ensignia/FreeDiver";
import Harpoonist from "../ensignia/Harpoonist";
import Recruit from "../ensignia/Recruit";
import TheBitten from "../ensignia/TheBitten";

export default function Home_UserInfo(){
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
      <div>
        <table className="home-table">
          <tbody>
            <tr className="home-categories">
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>RANK</th>
              <th>POINTS</th>
            </tr>
            <tr className="home-categories">
              <td>{username}</td>
              <td>{email}</td>
              <td>{userrank}</td>
              <td>{points}</td>
            </tr>
          </tbody>
        </table>
        <div className="home-rank">{userRank}</div>
      </div>
    );
}

