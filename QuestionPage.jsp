<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html5>

<html>
    <!-- learn how to include a graphic on your browser tab -->
    <!-- TODO: style everything better, add graphics for adding a question -->
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Flash Card Shark</title>
        <style><c:import url="../css/jquery-ui.css"></c:import></style>
        <script><c:import url="../js/jquery.js"></c:import></script>
        <script><c:import url="../js/jquery-ui.js"></c:import></script>
        <script><c:import url="../js/scuttlebutt.js"></c:import></script>
        <script><c:import url="../js/QuestionPage.js"></c:import></script>
        <script><c:import url="../js/qp2.js"></c:import></script>
        <style><c:import url="../css/QuestionPageSheet.css"></c:import></style>
        <style><c:import url="../css/scuttlebutt.css"></c:import></style>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0087ad">
        
        <meta name="msapplication-TileColor" content="#2d89ef">
        <meta name="theme-color" content="#000000">
    </head>

    <body onload="bodyLoaded();">
        <div class="menuBackground" id="tabmenu">

            <!-- ------------------------------------------------------ --> 
            <!--            TAB MENU                                    -->
            <!-- ------------------------------------------------------ -->

            <ul id="tablist">
                <li id="chumtab"><a  href="#chum">Chum</a></li>
                <li id="hometab"><a  href="#home">Home(Boat)</a></li>
                <li id="testtab"><a  href="#test">Test the water</a></li>
                <li id="galleytab"><a  href="#galley">Galley</a></li>
                <li id="scuttlebutttab"><a  href="#scuttlebutt">Scuttlebutt</a></li>
            </ul>

            <!-- ------------------------------------------------------ --> 
            <!--            Chum                                        -->
            <!-- ------------------------------------------------------ --> 

            <div id="chum">
                <form id="chumForm" action="/QuestionPageServlet" method="POST">
                    <!-- CHUM page question and answer text areas along with some buttons -->
                    <div>
                        <textarea id="chumCard" name="card" rows="15" cols="65"></textarea> <br/>
                        <textarea id="chumAnswer" name="answer" rows="15" cols="65"></textarea>
                    </div>
                    <div class="rightsidegraph">
                        <img id="chumgraphic" src="images/fcs1.svg" height="500px" width="250px" />
                    </div>
                    <br/>
                    <input type="hidden" name="name" value="submit"/>
                    <span style="color:white">Category:</span> <input id="chumCategory" type="text" name="cat"/> <input type="submit" name="submit" value="submit" id="submit"/>
                </form>
                
            </div>

            <!-- ------------------------------------------------------ --> 
            <!--            Home                                        -->
            <!-- ------------------------------------------------------ --> 

            <div id="home">
                <h1>${sessionScope.user.firstname} ${sessionScope.user.lastname}</h1>
            
                    <input id="myprofile" type="button" value="Profile" />
                    <input id="logout" name="logout" type="button" value="Logout"/>
                    <input id="refresh" type="button" name="name" value="Refresh"/>
                    
                <table> 
                    <tr>
                        <th>EMAIL</th>
                        <th>USERNAME</th>
                        <th>ID</th>
                        <th>CARD COUNT</th>
                        <th>RANK</th>
                    </tr>
                    <tr>
                        <td><c:out value="${sessionScope.user.email}"></c:out></td>
                        <td id="myusername"><c:out value="${sessionScope.user.userName}"></c:out></td>
                        <td><c:out value="${sessionScope.user.userID}"></c:out></td>
                        <td><c:out value="${sessionScope.user.cardListSize}"></c:out></td>
                        <td id="currentrank"><c:out value="${sessionScope.user.rank}"></c:out></td>
                        <td hidden="true" id="currentpoints"><c:out value="${sessionScope.user.points}"></c:out></td>
                    </tr>
                    
                </table>
                    <div class="ensignia">
                        <img id="ensignia" height="250px" width="150px"/>
                    </div>
                <br/>
                    <div class="standardtable">
                    <table id="categorytable">
                        <tr id="headers">
                            <th>Category</th>
                            <th>Right / Wrong</th>
                            <th>Card Count</th>
                            <th>Filter Quesitons by Category</th>
                        </tr>
                        <c:forEach items="${sessionScope.CatRating}" var="cat">
                            <tr>
                                <td><c:out value="${cat.key}"></c:out></td>
                                <td><c:out value="${cat.value[0]}"></c:out>/<c:out value="${cat.value[1]}"></c:out></td>
                                <td><c:out value="${cat.value[2]}"></c:out></td>
                                <td><input type="checkbox" name="catFilterGroup" value="${cat.key}" checked /></td>
                            </tr>
                        </c:forEach>
                    </table> 
                    </div>
                    <br/>
                    <br/>
                        <input type="button" id="filterbutton" value="Filter"/>
                        <input type="button" id="unfilterbutton" value="Remove Filter"/>
                    <br/>
                    <br/>
              
                    <p>Study History</p>
                        <div id="sessionhistory">
                        <table>
                            <tr>
                                <th>Total Cards Seen</th>
                                <th>Correct</th>
                                <th>Incorrect</th>
                                <th>Date</th>
                            </tr>
                            
                            <c:forEach items="${sessionScope.sessionhistory}" var="sess">
                                <tr>
                                    <td><c:out value="${sess.cardsseen}"></c:out></td>
                                    <td><c:out value="${sess.cards_correct}"></c:out></td>
                                    <td><c:out value="${sess.cards_incorrect}"></c:out></td>
                                    <td><c:out value="${sess.date}"></c:out></td>
                                </tr>
                            </c:forEach>
                            
                        </table>
                        </div>
                    
                    <!-- rank up logout popup -->
                    <div id="upgradepopup" class="popup">
                        
                        <div class="popup-content">
                            <div class="popup-header">
                                <span class="close">&times;</span>
                                <h2 id="newbadgemessage"></h2>
                            </div>
                            <div class="popup-body">
                                <img id="popupnewbadge" height="400px" width="230px"/>
                            </div>
                        </div>
                        
                    </div>
            </div>

            <!-- ------------------------------------------------------ --> 
            <!--           TEST                                         -->
            <!-- ------------------------------------------------------ --> 
            <div id="test" style="position: relative;">
                
                <div id="areas">
                    <textarea rows="20" cols="50" id="cardArea"></textarea>
                    <textarea rows="20" cols="40" id="answerArea"></textarea>   
                </div>
                
                <div style="margin-top: 10px; margin-bottom: 10px;" id="setdisplay">
                    
                </div>
                
                <div id="pointsdiv">
                    <p class="pointsNormal" id="points"></p>
                </div>

                <div id="buttoncontrolgroup">
                    <button id="show">Show</button>
                    <button id="update">Update</button>
                    <button id="nailedit">Nailed it</button>
                    <button id="missedit">Missed it</button>
                    <button id="comebacktothisone">Come back to this one!</button>  
                    <button id="review">Review</button>
                    <p id="questinfo">| Rating: <span id="rating"></span> | Category: <span id="cat"> </span> | Card Number: <span id="cardid"></span> | Questions To Review: <span id="reviewcount"></span></p>
                </div>  
            </div>
            
            <!-- ------------------------------------------------------ --> 
            <!--           Galley                                  -->
            <!-- ------------------------------------------------------ --> 
            <div id="Galley" style="height: 1500px;">
                
                    <h1 id="currentusername"><c:out value="${sessionScope.user.userName}"></c:out></h1>
                    <hr>
                    <!-- card set creation -->
                    <div class="sets">
                        
                        <div class="standardtable" id="allquestions" style="height: 700px;">
                        <table>
                            <thead>
                            <tr> 
                                <th>Card</th>
                                <th>Category</th>
                                <th>Right</th>
                                <th>Wrong</th>
                            </tr>
                            </thead>
                            <tbody id="questionsforsets">
                                
                            </tbody>
                        </table>
                        </div>
                        
                        <div style="position:absolute; top: 730px; left: 30px;">
                            <input id="previouspage" type="button" value="<--"/>
                            <input id="nextpage" type="button" value="-->"/>
                        </div>
                        <div style="position:absolute; top: 730px; left: 200px;">
                            <p id="pagenumber">1</p>
                        </div>
                        <br/>
                        <div id="setbuttons" style="position: absolute; top: 780px; left: 30px; z-index: 2">
                            <input id="addquestionstoset" type="button" value="Add" />
                            <input id="deletequestion" type="button" value="Delete"/>
                        </div>

                        <div id="setinprogressid" class="setinprogress" style="display:none; top:880px; left: 250px; box-shadow: 5px 5px black; z-index: 1;height:10px;width:10px;">   
                        </div>
                        
                        <div id="setnamediv" style="position:absolute; top: 940px; left: 130px; z-index: 4; display:none;">
                            <input class="setinfo" id="setname" type="text" placeholder="Name"/> <br/>
                            <br/>
                            <textarea class="setinfo" id="setdescription" placeholder="Set Description" ></textarea>
                        </div>
                        
                        <div id="setbuttondiv" style="position: absolute; top: 940px; z-index: 4; left: 130px; display:none;">
                            <input id="setsavebutton" value="Save" type="button" />
                        </div>
                        
                        <div id="sharebuttons" style="display:none; position:absolute; right:20px; height:45px">
                            <input id="study" type="button" value="Study"/>
                            <input id="share" type="button" value="Share"/>
                            <input id="remove" type="button" value="Remove"/>
                        </div>
                        
                        <div id="activityfeed" style="position: absolute; right: 20px; height: 600px; width: 600px; top: 50px;">
                            
                        </div>
                        
                    </div>             
            </div>
            <!-- ------------------------------------------------------ --> 
            <!--           Scuttlebutt                                 -->
            <!-- ------------------------------------------------------ -->         
            <div id="scuttlebutt" style="height: 3000px;"> 
            <div id="setfeed" class="sets">
                <div class="searchbar" id="searchbar">
                    <input type="button" value="search"/>
                    <input type="text" style="position:absolute; left:50%; right: 49%; width: 300px;"/>
                </div>
                <div style="position:absolute; width: 400px; border: 1px solid black;">
                    <div id="mysets">
                        
                    </div>
                </div>
                
                <!-- MATES -->
                
                <div class="mates" id="mates">
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td id="matename"></td>
                                <td id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td id="matesets" colspan="2">5 sets</td>
                                <td id="matebadeges" colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div> 
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td id="matename"></td>
                                <td id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td colspan="2">5 sets</td>
                                <td colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td id="matename">/td>
                                <td id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td colspan="2">5 sets</td>
                                <td colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td id="matename"></td>
                                <td id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td colspan="2">5 sets</td>
                                <td colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td id="matename"></td>
                                <td id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td colspan="2">5 sets</td>
                                <td colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td id="matename"></td>
                                <td id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td colspan="2">5 sets</td>
                                <td colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td id="matename"></td>
                                <td id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td colspan="2">5 sets</td>
                                <td colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mate">
                        <table class="mateinfotable">
                            <tr>
                                <td><img class="mateavatar" src="images/fcs1.svg"/></td>
                                <td  id="matename"></td>
                                <td  id="matepoints"></td>  
                                <td><img id="matesensignia" height="100" width="75"/></td>
                            </tr>
                            <tr>
                                <td colspan="2">5 sets</td>
                                <td colspan="2">badges...</td>
                            </tr>
                            <tr>
                                <td id="matebio" colspan="4">I'm max I like to stare at my computer and punch holes in wallls when I'm mad!</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            </div>
                    
        </div>
    </body>
</html>
