import React from 'react';
import { connect } from 'react-redux';
import '../HomeScreenCustomSheet.css';


class Home_UserInfo extends React.Component {
  //desctructure props arg
  constructor(props) {
      super(props);
  }

  render() {
    return (
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
            <td>{this.props.firstName} {this.props.lastName}</td>
            <td>{this.props.email}</td>
            <td id="myusername">{this.props.userName}</td>
            <td>{this.props.user_id}</td>
            <td>{this.props.cardCount}</td>
            <td id="currentrank">{this.props.rank}</td>
            <td hidden={true} id="currentpoints">
              {this.props.points}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => { 
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
