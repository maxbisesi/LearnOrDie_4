import React from 'react';
import { connect } from 'react-redux';
import '../HomeScreenCustomSheet.css';


class Home_History extends React.Component {
  constructor() {
      super();
  }

  render() {
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
                <td>card seen</td>
                <td>correct</td>
                <td>incorrect</td>
                <td>date</td>
              </tr>
            </tbody>
          </table>
        </div>
        </>
    );
  }
}
export default Home_History;