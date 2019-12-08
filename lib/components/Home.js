import React from "react";
import axios from "axios";
import "./HomeScreenCustomSheet.css";

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="home">
        <h1>{name}</h1>

        <input id="myprofile" type="button" value="Profile" />
        <input id="logout" name="logout" type="button" value="Logout" />
        <input id="refresh" type="button" name="name" value="Refresh" />

        <table>
          <tbody>
            <tr>
              <th>EMAIL</th>
              <th>USERNAME</th>
              <th>ID</th>
              <th>CARD COUNT</th>
              <th>RANK</th>
            </tr>
            <tr>
              <td>user email</td>
              <td id="myusername">username</td>
              <td>user id</td>
              <td>card list size</td>
              <td id="currentrank">rank</td>
              <td hidden={true} id="currentpoints">
                points
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ensignia">
          <img id="ensignia" height="250px" width="150px" />
        </div>
        <br />
        <div className="standardtable">
          <table id="categorytable">
            <tbody>
              <tr id="headers">
                <th>Category</th>
                <th>Right / Wrong</th>
                <th>Card Count</th>
                <th>Filter Quesitons by Category</th>
              </tr>
              <tr>
                <td>category name</td>
                <td>category right / wrong</td>
                <td>count</td>
                <td>
                  <input
                    type="checkbox"
                    name="catFilterGroup"
                    value=" check or nah"
                    defaultChecked={false}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <input type="button" id="filterbutton" value="Filter" />
        <input type="button" id="unfilterbutton" value="Remove Filter" />
        <br />
        <br />

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

        {/* rank up logout popup */}
        <div id="upgradepopup" className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <span className="close">&times;</span>
              <h2 id="newbadgemessage"></h2>
            </div>
            <div className="popup-body">
              <img id="popupnewbadge" height="400px" width="230px" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
