import React from "react";
import { connect } from "react-redux";
import "../HomeScreenCustomSheet.css";

class Home_History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("--- Home_History ---");
    return (
      <>
        <p>Study History</p>
        <div id="sessionhistory">
          <table>
            <tbody>
              <tr>
                <th>Total Cards Seen</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Date</th>
              </tr>
              <tr>
                <td>{this.props.total}</td>
                <td>{this.props.correct}</td>
                <td>{this.props.incorrect}</td>
                <td>date</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.session.points,
    streak: state.session.streak,
    rut: state.session.rut,
    total: state.history.total,
    correct: state.history.nailed,
    incorrect: state.history.whiffed
  };
};

export default connect(mapStateToProps)(Home_History);
