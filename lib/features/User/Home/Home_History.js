import React from "react";

export default function Home_History() {
    // useSelector ->
    /*    
    points: state.session.points,
    streak: state.session.streak,
    rut: state.session.rut,
    total: state.history.total,
    correct: state.history.times_right,
    incorrect: state.history.times_wrong
    */
    console.log("--- Home_History ---");
    return (
      <>
        <p>Study History</p>
        <div className="home-history">
          <table className="home-table">
            <tbody>
              <tr>
                <th>Total Cards Seen</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Date</th>
              </tr>
              <tr>
                <td>total</td>
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
