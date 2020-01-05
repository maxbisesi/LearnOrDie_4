import React from "react";
import { connect } from "react-redux";
//import "../HomeScreenCustomSheet.css";
import BucketBrigade from "../Graphics/BucketBrigade";
import CageMaster from "../Graphics/CageMaster";
import FreeDiver from "../Graphics/FreeDiver";
import Harpoonist from "../Graphics/Harpoonist";
import Recruit from "../Graphics/Recruit";
import TheBitten from "../Graphics/TheBitten";

class Home_UserInfo extends React.Component {
  //desctructure props arg
  // Set style based on rank
  // create style for each rank
  constructor(props) {
    super(props);
  }

  renderRank(rank) {
    switch (rank) {
      case "Guest":
        return <Recruit />;
      case "Recruit":
        return <Recruit />;
      case "Bucket Brigade":
        return <BucketBrigade />;
      case "Harpoonist":
        return <Harpoonist />;
      case "Free Diver":
        return <FreeDiver />;
      case "Cage Master":
        return <CageMaster />;
      case "The Bitten":
        return <TheBitten />;
      case "Great White":
        throw new Error(" havent drawn it yet");
        return;
      default:
        return null;
    }
  }

  render() {
    const rank = this.renderRank('The Bitten');
    console.log(` rank-> ${rank}`);
    return (
      <div>
        <table>
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
                {this.props.firstName} {this.props.lastName}
              </td>
              <td>{this.props.email}</td>
              <td id="myusername">{this.props.userName}</td>
              <td>{this.props.user_id}</td>
              <td>{this.props.cardCount}</td>
              <td id="currentrank">{this.props.rank}</td>
              <td hidden={false} id="currentpoints">
                {this.props.points}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="rank">{rank}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.user.user_id,
    userName: state.user.userName,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    points: state.user.points,
    cardCount: state.user.cardCount,
    rank: state.user.rank
  };
};

export default connect(mapStateToProps)(Home_UserInfo);
