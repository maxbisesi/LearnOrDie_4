import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import BucketBrigade from "../ensignia/BucketBrigade";
import CageMaster from "../ensignia/CageMaster";
import FreeDiver from "../ensignia/FreeDiver";
import Harpoonist from "../ensignia/Harpoonist";
import Recruit from "../ensignia/Recruit";
import TheBitten from "../ensignia/TheBitten";

export default function Home_UserInfo(){
  const { user_id,userName,firstName,lastName, email, totalPoints, cardCount, rank, guest } = useSelector( state => state.userSlice.user, shallowEqual );

  function renderRank(rank) {
    switch (rank) {
      case "Guest":
        return <Recruit />;
      case "Recruit":
        return <Recruit />;
      case "Bucket Brigade":
        return <BucketBrigade />;
      case "Harpoonist":
        return <Harpoonist />;
      case "FreeDiver":
        return <FreeDiver />;
      case "Cage Master":
        return <CageMaster />;
      case "The Bitten":
        return <TheBitten />;
      case "Great White":
        throw new Error(" havent drawn it yet");
      default:
        return null;
    }
  }

    const userRank = renderRank(rank);
    return (
      <div>
        <table className="home-table">
          <tbody>
            <tr>
              <th>USER</th>
              <th>EMAIL</th>
              <th>USERNAME</th>
              <th>ID</th>
              <th>CARD COUNT</th>
              <th>RANK</th>
            </tr>
            <tr>
              <td>
                {firstName} {lastName}
              </td>
              <td>{email}</td>
              <td>{userName}</td>
              <td>{user_id}</td>
              <td>{cardCount}</td>
              <td>{rank}</td>
              <td hidden={false}>
                {totalPoints}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="home-rank">{userRank}</div>
      </div>
    );
}

