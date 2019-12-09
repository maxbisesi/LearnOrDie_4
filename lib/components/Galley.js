import React from 'react';
import './QuestionPageSheet.css';
import PropTypes from 'prop-types';

class Galley extends React.Component {
  constructor(props, context) {
    super();
  }

  render() {
    return (
    <div id='Galley' style={{height: 1500}}>
                
        <h1 id='currentusername'>username</h1>
        {/* Card Set creation */}
        <div className='sets'>
            
            <div className='standardtable' id='allquestions' style={{height: 700}}>
            <table>
                <thead>
                <tr> 
                    <th>Card</th>
                    <th>Category</th>
                    <th>Right</th>
                    <th>Wrong</th>
                </tr>
                </thead>
                <tbody id='questionsforsets'>
                    
                </tbody>
            </table>
            </div>
            
            <div style={{position:'absolute',top: 730, left: 30}}>
                <input id='previouspage' type='button' value='<--'/>
                <input id='nextpage' type='button' value='-->'/>
            </div>
            <div style={{position:'absolute', top: 730, left: 200}}>
                <p id='pagenumber'>1</p>
            </div>
            <br/>
            <div id='setbuttons' style={{position:'absolute', top: 780, left: 30, zIndex: 2}}>
                <input id='addquestionstoset' type='button' value='Add' />
                <input id='deletequestion' type='button' value='Delete'/>
            </div>

            <div id='setinprogressid' className='setinprogress' style={{display:'none', top:880, left: 250, boxShadow: '5 5 black', zIndex: 1,height:10, width:10}}>   
            </div>
            
            <div id='setnamediv' style={{position:'absolute', top: 940, left: 130, zIndex: 4, display:'none'}}>
                <input className='setinfo' id='setname' type='text' placeholder='Name'/> <br/>
                <br/>
                <textarea className='setinfo' id='setdescription' placeholder='Set Description' ></textarea>
            </div>
            
            <div id='setbuttondiv' style={{position: 'absolute', top: 940, zIndex: 4, left: 130, display:'none'}}>
                <input id='setsavebutton' value='Save' type='button' />
            </div>
            
            <div id='sharebuttons' style={{display:'none', position:'absolute', right:20, height:45}}>
                <input id='study' type='button' value='Study'/>
                <input id='share' type='button' value='Share'/>
                <input id='remove' type='button' value='Remove'/>
            </div>
            
            <div id='activityfeed' style={{position: 'absolute', right: 20, height: 600,  width: 600, top: 50}}>
                
            </div>
            
        </div>             
    </div>
    );
  }
}
Galley.contextTypes = { user: PropTypes.object };
export default Galley;
