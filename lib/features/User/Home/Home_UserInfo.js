import React from "react";
import { connect } from "react-redux";
import BucketBrigade from "../../components/Graphics/BucketBrigade";
import CageMaster from "../../components/Graphics/CageMaster";
import FreeDiver from "../../components/Graphics/FreeDiver";
import Harpoonist from "../../components/Graphics/Harpoonist";
import Recruit from "../../components/Graphics/Recruit";
import TheBitten from "../../components/Graphics/TheBitten";

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
      default:
        return null;
    }
  }

  render() {
    const rank = this.renderRank('The Bitten');
    console.log(` rank-> ${rank}`);
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
                {this.props.firstName} {this.props.lastName}
              </td>
              <td>{this.props.email}</td>
              <td>{this.props.userName}</td>
              <td>{this.props.user_id}</td>
              <td>{this.props.cardCount}</td>
              <td>{this.props.rank}</td>
              <td hidden={false}>
                {this.props.points}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="home-rank">{rank}</div>
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
