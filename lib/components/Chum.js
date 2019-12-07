import React from 'react';
// import axios from 'axios';

class Chum extends React.Component {
    constructor(){

    }

    render(){
        <>
        <div id="chum">
        <form id="chumForm" action="/QuestionPageServlet" method="POST">
            <div>
                <textarea id="chumCard" name="card" rows="15" cols="65"></textarea> <br/>
                <textarea id="chumAnswer" name="answer" rows="15" cols="65"></textarea>
            </div>
            <div class="rightsidegraph">
                <img id="chumgraphic" src="public/images/custom/fcs1.svg" height="500px" width="250px" />
            </div>
            <br/>
            <input type="hidden" name="name" value="submit"/>
            <span style="color:white">Category:</span> <input id="chumCategory" type="text" name="cat"/> <input type="submit" name="submit" value="submit" id="submit"/>
        </form>
         </div>
        </>
    }
    
}
export default Chum