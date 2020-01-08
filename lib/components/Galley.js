import React from 'react';
//import './Galley.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Styles/Galley.css';
import GalleyQuestion from './Presentational/GalleyQuestion';

class Galley extends React.Component {
  constructor(props) {
    super(props);
    this.pageOneCards = [];

    this.state = {};

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    //this.deleteSet = this.deleteSet(this);

    const pageone = props.cards.length > 100 ? 100 : props.cards.length;

    for (let i = 0; i < pageone; i++) {
      let card = this.props.cards[i];
      this.pageOneCards.push(
        <GalleyQuestion key={card.cardid} cardid={card.cardid} card={card.card} category={card.category} times_right={card.times_right} times_wrong={card.times_wrong} />
      );
    }
  }

  handleCardClick(e) {
    const clickedID = e.currentTarget.getAttribute('data-cardid');
    console.log(`Clicked ID current target: ${clickedID}`);
  }

  handleMouseEnter(e) {
    console.log('mouse enter');
  }
  /*deleteSet() {
  //$("#deleteset").button().click(function(){
      var deleteIDs = getClickedCardSetIDs();
      $(".clickedset").each(function(){
          $(this).remove();
      });
      
      $.post("/lod1/QuestionPageServlet",{name:"deletequestionset",result:JSON.stringify(deleteIDs)},function(data,textstatus,jqXHR){
          //do something
      });
  }

  share() {
    //$("#share").button().click(function(){
        var shareSetIDs = getClickedCardSetIDs();
        
        $.post("/lod1/Scuttlebutt",{name:"sharesets",data:JSON.stringify(shareSetIDs)},function(data,textstatus,jqXHR){
            console.log(data);
            $(".clickedset").each(function(){
                var setId = $(this).attr('id');
                var name = $(this).text();
                $("#mysets").append('<div id="'+setId+'" class="smallsetitem">'+name+'</div>');
                $(this).toggleClass("clickedset");
            });
        });   
        
    }

    addQuestionToSet() {
      
        //$("#addquestionstoset").button().click(function(){
        //only show set if it is currently hidden
        var clickedcards = getClickedCardIDs();
        if($("#setinprogressid").css("display") === "none") {
            $("#setinprogressid").css("display","block");
        }
        setsize += clickedcards.length;
        //$(".setinprogress").empty();
        
        //grow the set
        if(clickedcards.length === 1){
            $("#setinprogressid").animate({height:'+=10',width:'+=14',left:'-=5',top:'-=5px',fontSize:'+=3'},1400).text(setsize);
        } else if(clickedcards.length > 1 && clickedcards.length <= 5){
            $("#setinprogressid").animate({height:'+=20',width:'+=24',left:'-=10',top:'-=10px',fontSize:'+=5'},900).text(setsize);
        } else if(clickedcards.length > 5 && clickedcards.length <= 10){
            $("#setinprogressid").animate({height:'+=25',width:'+=29',left:'-=13',top:'-=13px',fontSize:'+=7'},500).text(setsize);
        } else if(clickedcards.length > 10){
            $("#setinprogressid").animate({height:'+=30',width:'+=34',left:'-=20',top:'-=20px',fontSize:'+=15'},300).text(setsize);
        }
        
        //after growth if the top edge is overlapping the buttons move it down
        //use DOMRects instead
        var setinprogressRect = document.getElementById("setinprogressid").getBoundingClientRect();
        var setbuttons = document.getElementById("setbuttons").getBoundingClientRect();
        
        if(setinprogressRect.top <= setbuttons.bottom){
            $("#setinprogressid").animate({top:'+=50'},500);
        }
        
        clearClickedCards(); 
    }

    setInProgressID () {
      
    //$("#setinprogressid").on({
        mouseenter:function(){
            if(setsize > 20){
                var h = $(this).height();
                var toppos = $(this).position();    // css("top");
                var newpos = h + toppos.top + 55;
                $("#setnamediv").css("top",newpos);
                $("#setnamediv").fadeIn(1200);
                
                //add handlers to these
                $("#setname, #setdescription").change(function(){
                    var newpos3 = newpos + 90;
                    $("#setbuttondiv").css("top",newpos3);
                    $("#setsavebutton").button();
                    $("#setbuttondiv").fadeIn(1200);
                });
            }
            
            //play animation when hovering over set
            
        },
        mouseleave:function(){

        }
        
    }



    setSaveButtonOn () {
      
    //$("#setsavebutton").on("click",function(){
        setsize = 0;
        page = 1;
        questionsaddedclicks = 0;
        
        //save the set to db
        //use cardset to save all the selectedquestions then clear that array for next use
        var setdesc = $("#setdescription").val();
        var setname = $("#setname").val();
        var newsetid;
        $.post("/lod1/QuestionPageServlet",{name:"savequestionset",result:JSON.stringify(cardset),setname:setname,setdesc:setdesc},function(responseJSON){
            console.log(responseJSON);
            newsetid = responseJSON.setID;
            //put the set in the activity feeed before animating its appearance...
            $("#activityfeed").prepend('<div id="'+responseJSON.setID+'" style="display:none" class="setitem">'+name+'</div>');
            $("#"+newsetid).slideDown(3000);
        });
        
        //animate
        var name = $("#setname").val();
        $("#setnamediv").effect("clip",500);
        $("#setbuttondiv").effect("clip",500);
        //$("#setinprogressid").effect("puff",400);

        $("#setinprogressid").width(10);
        $("#setinprogressid").height(10);
        $("#setinprogressid").css("font-size","10px");
        $("#setinprogressid").effect("puff",400);
        $("#setname, #setdescription").val('');
        //css("left",250).css("height","3px").css("width","3px");

        //clear cardset after submission
        cardset = []; 
    });


    study() {
      
    //$("#study").click(function(){
    $("#tabmenu").tabs("option", "active", 2 ); 
    var setids = getClickedCardSetIDs();
    var setnames = [];
        $.get("/lod1/SetServlet",{name:"getsets",data:JSON.stringify(setids)},function(list){
            console.log("Study the selected sets");
            //unselect all sets..
            $(".clickedset").each(function() {
                $(this).removeClass("clickedset");
                var name = $(this).text();
                var id = $(this).attr('id');
                //fill one set 
                $('#setdisplay').append('<div data-setid="'+id+'" class="setintest">'+name+'</div>');
            }); 
        }); 
    }

    activityFeed() {
        //$("#activityfeed").on('click','div',function(event){
       // $(this).toggleClass("clickedset");
       // $("#sharebuttons").fadeIn(500);
    }

    nextPage() {
    $("#nextpage").button().on('click',function(){
        page++;
        //$("#questionsforsets").empty();
        $.get("/lod1/Data",{name:"pagechange",pagenumber: page},function(list){
            console.log(list);
            if(list.numberofpages === 'none'){
                console.log('no more pages');
                return;
            }
            
            $("#questionsforsets").empty();
            $("#questionsforsets").effect("highlight");
            $.each(list,function(index,card){
            $("#questionsforsets").append('<tr><td class="questioncell" data-cardid="'+card.flashCardnum+'" ><div class="longtexttd">'+card.card+'</div></td><td>'+card.category+'</td><td>'+card.made+'</td><td>'+card.missed+'</td></tr>'); 
            });
            $("#pagenumber").text(page);
            },"json");
    }

    previousPage() {
        //$("#previouspage").button().on('click',function(){
            page--;
            if(page <= 0){
                page = 0;
            }
            //$("#questionsforsets").empty();
            $.get("/lod1/Data",{name:"pagechange",pagenumber: page},function(list){
                console.log(list);
                if(list.numberofpages === 'none'){
                    console.log('no more pages');
                    return;
                }
                
                $("#questionsforsets").empty();
                $("#questionsforsets").effect("highlight");
                $.each(list,function(index,card){
                $("#questionsforsets").append('<tr><td class="questioncell" data-cardid="'+card.flashCardnum+'" ><div class="longtexttd">'+card.card+'</div></td><td>'+card.category+'</td><td>'+card.made+'</td><td>'+card.missed+'</td></tr>');
                
                });
                $("#pagenumber").text(page);
        },"json");
    }

    questionsForSets() {
    //$("#questionsforsets").on('click','td.questioncell',function(){
        if($(this).hasClass("clickedquestion")){
            $(this).removeClass("clickedquestion");
        }else{
            $(this).addClass("clickedquestion");
        }
    }

    setDisplay() {
        //$("#setdisplay").on('click','div',function(){
        //remove setintest
        // from layout and remove questions from backend
        // if all sets are removed set cards back to all cards.
        var id = $(this).data('setid');
        console.log('removed id: '+id);
        var keepids = [];
        $("#setdisplay .setintest").each(function(index) {
            var keep = $(this).data('setid');
            keepids.push(keep);
            console.log('keep: '+keep);
        });
        
        if(keepids.length === 1) {
            console.log("keeps is 1, restore all cards");
            $.get("/lod1/SetServlet",{name:"restore",data:"none"},function(list){
                
            });
        }else {
            //remove id from keepers
            console.log(keepids.indexOf(id));
            keepids.splice(keepids.indexOf(id), 1);
            $.get("/lod1/SetServlet",{name:"getsets",data:JSON.stringify(keepids)},function(list){
                console.log('success');
            });
        }
        $(this).remove();
    }

    deleteQuestion(){
        var deletecardids = [];
        $(".clickedquestion").each(function(){
            var cardId = $(this).data('cardid');
            console.log('delete: '+cardId);
            deletecardids.push(cardId);
            $(this).parent().remove();
        });
        $.get("/lod1/Data",{name:"deletequestions",data:JSON.stringify(deletecardids)},function(list){
            console.log(list);
        });
    }

    getClickedCardSetIDs() {
        var clickedsetids = [];
        $(".clickedset").each(function(){
            var setId = $(this).attr('id');
            clickedsetids.push(setId);
        });

        return clickedsetids;
    }

    getClickedCardIDs() {
        var clickedcardids = [];
        $(".clickedquestion").each(function() {
            var flashcardnum = $(this).data('cardid');
            cardset.push(flashcardnum);
            clickedcardids.push(flashcardnum);
        });

        return clickedcardids;
    }

    clearClickedCards() {
        $(".clickedquestion").each(function() {
        $(this).removeClass("clickedquestion"); 
    } */

  render() {
    return (
      <div className="galley">
        <h1>{this.props.username}</h1>
        {/* Card Set creation */}
        <div>
          <div>
            <table className="galley-question_table">
              <thead>
                <tr>
                  <th className="galley-question_table-headers">Card</th>
                  <th className="galley-question_table-headers">Category</th>
                  <th className="galley-question_table-headers">Right</th>
                  <th className="galley-question_table-headers">Wrong</th>
                </tr>
              </thead>
              <tbody>{this.pageOneCards}</tbody>
            </table>
          </div>

          <div className="galley-buttons-navigation">
            <input className="galley-button" type="button" value="<--" />
            <input className="galley-button" type="button" value="-->" />
            <input className="galley-button" type="button" value="Add" />
            <input className="galley-button" type="button" value="Delete" />
            <input className="galley-button" type="button" value="Add" />
            <input className="galley-button" type="button" value="Delete" />
          </div>
          <div className="galley-pagenumber">
            <p>1</p>
          </div>
          <br />
          <div
              className="galley-set_buttons"
          >

        </div> 

          <div
            className="setinprogress"
          ></div>

          <div
            id="setnamediv"
            style={{
              position: 'absolute',
              top: 940,
              left: 130,
              zIndex: 4,
              display: 'none'
            }}
          >
            <input
              className="setinfo"
              id="setname"
              type="text"
              placeholder="Name"
            />{' '}
            <br />
            <br />
            <textarea
              className="setinfo"
              id="setdescription"
              placeholder="Set Description"
            ></textarea>
          </div>

          <div
            id="setbuttondiv"
            style={{
              position: 'absolute',
              top: 940,
              zIndex: 4,
              left: 130,
              display: 'none'
            }}
          >
            <input id="setsavebutton" value="Save" type="button" />
          </div>

          <div
            id="sharebuttons"
            style={{
              display: 'none',
              position: 'absolute',
              right: 20,
              height: 45
            }}
          >
            <input id="study" type="button" value="Study" />
            <input id="share" type="button" value="Share" />
            <input id="remove" type="button" value="Remove" />
          </div>

          <div
            id="activityfeed"
            style={{
              position: 'absolute',
              right: 20,
              height: 600,
              width: 600,
              top: 50
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    username: state.user.userName,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Galley);
