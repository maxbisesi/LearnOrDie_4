//saved questions by clicking come back to this one
var savedQuestions = [];
//-----------------------------------------------
var answerShown = false;
//streaks start after 3 made or missed questions
var streak = 0;
var missedstreak = 0;
//----------------------------------------------
var userspoints = 0;
//questionsclick is a count of how many times they have clicked nailed or missed
var questionsclicked = 0;
//---------------------------------------------------
//keep track of how many made and missed
var made = 0;
var missed = 0;
//====================================================
var pagestatus = "first";
var questioncounter = 0;

var bbmessage = "You've done well so far. Clearly you can handle yourself in rocky waters. Welcome to the Bucket Brigade.";
var hmessage = "We need a steady hand like yours. Stay focused when your target is near. You are now a Harpoonist.";
var fdmessage = "Few have what it takes to dive these black waters. God frowns on those monsters lurking below. Now you must be our Free Diver.";
var cmmessage = "Our recruits can get a little nervous. We need your titanium nerve to strike courage in their hearts. Go, lead your men as the new Cage Master";
var tbmessage = "You survived. You have lost all fear of these demons. Take your place in the strata of legend as one of the Bitten.";
var gwmessage = "Swim freely now and smile. You hunt with them like a brother. Let innocent flesh flee in terror as your glistening fin cuts the ocean sky.";

var loggedout = false;

$( document ).ready(function() {
    
   console.log('here we go ');
   
   $( "#tabmenu" ).tabs({
        show:{ effect: "blind", duration: 800},
        active: 1//disabled:[3]
    }); 
    
   $( "#buttoncontrolgroup" ).controlgroup().draggable();
   $( "#submit" ).button();
   $( "#logout" ).button();
   $( "#filterbutton" ).button();
   $( "#unfilterbutton" ).button();
   $( "#refresh" ).button();
   
   
   $("#filterbutton").on("click",function() {
       var selectedCats = [];
      $("#categorytable input:checkbox").each(function(){
          if($(this).is(":checked")) {
            selectedCats.push($(this).val());
          }
      });
     
      $.post("/lod1/QuestionPageServlet",{name:"filter",result:JSON.stringify(selectedCats)},function(responseJSON){
          //possibly redirect to next tab
      });  
   });
   
   $( "#unfilterbutton" ).on("click", function() {
      $.post("/QuestionPageServlet",{name:"filter",result:"remove"},function(response){}); 
      $("#categorytable input:checkbox").each(function() {
          $(this).prop("checked",true);
      });
   });
   
   $("#logout").on("click", function() {
       calculateNextRank();
       if(upgraded){
           $( "#upgradepopup" ).css('display','block');
       }
       
       //update the cards for session then set logged out flag to true, so
       //that unload event doesn't also have to update
       updateCardsForThisSession();
       loggedout = true;
       
       //updateCardsForThisSession();
       console.log("users points,JS: "+userspoints);
       $.ajax({
              type:"get",
              url:"/lod1/QuestionPageServlet",
              data: {
                  name: "logout",
                  result: "none",
                  points: userspoints
              },
              success: function(response,staus){
                  console.log("You are logged out");
                  console.log(response);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log("You were not logged out: "+textStatus);
                  console.log(errorThrown);
              }
          });
   });
   
   
   $( "#refresh" ).on("click", function() {
       $.ajax({
           type:"get",
           url:"/lod1/Refresh",
           statusCode: {
               200: function(data,textstatus,jqXHR) {
               //shouldnt' have to do anything but maybe reoload..
                    //build the new table
                    var header ="<tr><th>Category</th><th>Right/Wrong</th><th>Card Count</th><th>Filter Questions by Category</th></tr>";
                    $("#categorytable").empty().append(header);
                    
                    var rowcounter = 0;
                    for(let [key,val] of Object.entries(data)) {
                        var keyrow = "<tr><td>"+key+"</td>";
                        var newrow1 = "<td>"+val[0]+"/"+val[1]+"</td>";
                        var newrow2 = "<td>"+val[2]+"</td>";
                        var $checkbox = $("<input />",{type:'checkbox',name:'catFilterGroup',checked:true,value:key});
                        var checkboxrow = "<td id="+rowcounter+"></td></tr>";
                        var row = keyrow+newrow1+newrow2+checkboxrow;
                        $("#categorytable").append(row); 
                        $("#"+rowcounter).append($checkbox);
                        rowcounter++;
                    } 
               },
               204: function(data, textstatus, jqXHR) {
                   alert("You haven't added any cards yet...");
                   return;
               }
           }
       });
   });
   
   $( "#nailedit" ).click(function() {
       //count the total time nailed and missed are clicked and add one to the streak for each nailed
       // set the miss streak back to 0 for getting one right.
       if(pagestatus == "first"){
           getCard("first");
           return;
       }
        questionsclicked++;
        getCard("nailed");
        streak += 1;
        missedstreak = 0;
        made++;
        //increase points for correctly answered questions
        //streak affects bonus points
        increasePoints();
        changeStoryFrame(); 
   });

   $( "#missedit" ).click(function() {
       //count the total time nailed and missed are clicked and take one from the streak for each missed
       //set the streak back to 0 for missing one
       if(pagestatus == "first"){
           getCard("first");
           return;
       }
       questionsclicked++;
       getCard("missed");
       missedstreak += 1;
       missed++;
       //----------------------------------------------------------------------
       //disable the streak effects for missing a question
            disableStreakEffects();
            streak = 0;
       //-----------------------------------------------------------------------
       answerShown = false;
       //decrease points for inccorrectly answered questions 
       //streak affects bonus points
       decreasePoints();
       changeStoryFrame();
   });
   
   $( "#update" ).click(function(){
       var updateCard = $( "#cardArea" ).val();
       var updateAnswer = $( "#answerArea" ).val();
       var updateCardID = $( "#cardid" ).text();
       
       $.ajax({
           type:"post",
           url:"/lod1/QuestionPageServlet",
           data: {
               name: "update",
               cardid: updateCardID,
               card: updateCard,
               answer: updateAnswer },
           
           success: function(response) {
                console.log("Updated Card number: "+updateCardID);
                $( "#cardArea" ).effect("shake");
                $( "#answerArea" ).effect("shake");
           },
           error: function(jqXHR, textStatus, errorThrown) {
               alert("error occurred"+errorThrown);
           }
         }); 
         
         answerShown = false;
       });
       
       $( "#submit" ).click(function(e) {
           e.preventDefault();
           changeChumGraphic();
           $.ajax({
                type:"post",
                url:"/lod1/QuestionPageServlet",
                data: $("#chumForm").serialize(),
                success: function(data,status,jqXHR){
			console.log("STATUS: "+status);
			console.log("submit to QP successful "+ " " + data);
                    $( "#chumCard").val("");
                    $( "#chumAnswer" ).val("");
                    $( "#chumCard" ).effect("slide","fast");
                    $( "#chumAnswer" ).effect("slide","fast");
                },
		error: function(jqxhr, status, error){
			console.log("an Error occured on the response---");
			console.log("jq: "+jqxhr);
			console.log("Status: "+status);
			console.log("error: "+error);
		}
            }); 
       });  
       
       $( "#comebacktothisone" ).click(function(e) {
           
           var card = $( "#cardArea" ).val();
           var answer = $( "#answerArea" ).val();
           
           if(!answerShown){
               window.alert("Look at the answer first before saving for review...");
               console.log("Look at the answer first before saving for review...");
               return;
           }
           
           $( "#cardArea").toggle("clip","fast");
           $( "#answerArea" ).toggle("clip","fast");
           $( "#cardArea").toggle("clip","fast");
           $( "#answerArea" ).toggle("clip","fast");
           
           savedQuestions.push(card);
           var reviewquestions = savedQuestions.push(answer); 
           reviewquestions = reviewquestions/2;
           $( "#reviewcount" ).text(reviewquestions);
       });
       
       $( "#review" ).click(function(e) {
           if(savedQuestions == undefined || savedQuestions.length < 1){
               // do nothing;
               alert("nothing to review");
               return;
           }
           $("#answerArea").val("");
           var answer = savedQuestions.pop();
           $( "#cardArea" ).val(savedQuestions.pop());
           
           $("#cardArea").effect("highlight","fast");
           
           $( "#show" ).click(function() {
                $( "#answerArea" ).val(answer); 
                answerShown = true;
        });
           
           reviewquestions = $( "#reviewcount" ).text();
           reviewquestions -= 1;
           $("#reviewcount").text(reviewquestions);
       });
       
       $( window ).on('beforeunload',function(){
            if(!loggedout){
                updateCardsForThisSession();
		console.log("browser unloaded");
            }
       });
       
       $("#myprofile").button().click(function() {
            var num_tabs = $("div#tabmenu ul li").length + 1;
            var username = $("#myusername").text();
            
            $("#hometab").after(
                "<li><a href='#tab" + username + "'>" + username + "</a></li>"
            );
    
            // jquery.load
            $("div#tabmenu").append(
                "<div id='tab" + username + "'> profile </div>"
            );
    
            $("#tab"+username).load("/lod1/profileTemplate.html",function() {
                //fill in template with user's info
                console.log("it worked");
            });
            
            $("div#tabmenu").tabs("refresh"); 
       });
 
   });
   
   function getCard(result) {
       //get the next question from servlet
       $.ajax({
          type:"get",
          url:"/lod1/QuestionPageServlet",
          data:{name:"next",result:result},
          statusCode: {
              200: function(data,textstatus,jqXHR) {
                  cardRecievedUpdateUI(data);
                  console.log(textstatus);
                  console.log('status: '+jqXHR.status);
                  console.log('response text: '+jqXHR.responseText);
                  enableButtons();
                  pagestatus="loaded";
                  questioncounter++;
                  answerShown = false;
                  return;
              },
              204: function(data,textstatus,jqXHR) {
                  alert('You havent added any cards yet, these waters are calm... go chum the water and come back when they start to circle.');
                  console.log(textstatus);
                  console.log('status: '+jqXHR.status);
                  console.log('response text: '+jqXHR.responseText);
                  return;
              },
              500: function(jqXHR,textstatus,errorThrown ) {
                  alert('There was a server problem');
                  console.log('status: '+jqXHR.status);
                  console.log('textstatus '+textstatus);
                  console.log('error thrown '+errorThrown);
                  console.log('response text: '+jqXHR.responseText);
                  return;
              }
              
          }
       });
   }
   
   function cardRecievedUpdateUI(responseJSON){
       
       //set the question and category texts using the response from the server
       $("#cardArea").val(responseJSON["card"]);
       $( "#cat"  ).text(responseJSON["category"]);
       $( "#cardid" ).text(responseJSON["flashCardnum"]);

       //clear answer field after every 'next'...
       $( "#answerArea" ).val("");

       //use the response to set the answer using the response from the server
       $( "#show" ).click(function() {
           console.log("show the answer");
            $( "#answerArea" ).val(responseJSON["answer"]); 
            answerShown = true;
        });

        //set difficulty icon based on how many times they've got it right or wrong
        $( "#rating").text(responseJSON["made"]+" / "+responseJSON["missed"]);
   }
   
   
   
   function updateCardsForThisSession() {
       console.log("save the users updates and update their card ratings");
          //create ajax request with speciel parameter to let the servlet know what to do 
          $.ajax({
              type:"get",
              url:"/lod1/QuestionPageServlet",
              data: {
                  name: "saveusedcards",
                  result: "none"
              },
              success: function(response,staus){
                  console.log("Your cards updated correctly");
                  console.log(response);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log("Your cards did not update: "+textStatus);
                  console.log(errorThrown);
              }
          });
   }
   
   function enableButtons() {
           $( "#show" ).removeClass("maxs-button-disabled");
           $( "#update" ).removeClass("maxs-button-disabled");
           $( "#comebacktothisone" ).removeClass("maxs-button-disabled");
           $( "#review" ).removeClass("maxs-button-disabled");
   }
  
  function bodyLoaded() {
      //introduction and usage instructions
      $( "#cardArea" ).val(" Ahoy!\n\
It's time to sink or swim or be eaten. \n\
If you miss one press 'missed it' to go to the next question\n\
If you get it right press 'nailed it'. \n\
Press either one to get started.\n\
\n\
If you want to change a question or answer simply make your change and press 'update'\n\
Save cards to go over later with 'come back to this one' then select review.\n\
The ratings below your buttons show information about your progress.\n\
\n\
Each question correctly answered earns you 10 points.\n\
If you can go on a Streak your points will accumulate quickly: \n\
\n\
3 question Streak = 2X (Green Level)\n\
5 question Streak = 3X (Purple Level) \n\
10 question Streak = 10X (Fire Level)\n\
20 question Streak = 20X (Rainbow Level)\n\
30 question Streak = total points X 1.5 (Gold Level)\n\
50 question Streak = total points start to double (Water Level) \n\
100 and beyond = with each question your points increase exponentially! (still unknown...)\n\
\n\
There are missed question Streaks too, just avoid those. \n\
\n\
FlashCardSharks feed on missed questions.\n\
They hunger for human flesh so if you have an arm torn off don't give up\n\
you can still paddle to safety with your three remaining limbs.\n\
\n\
Good Luck!");
      
      //don't let them do anything stupid before a question is loaded
      $( "#show" ).addClass("maxs-button-disabled");
      $( "#update" ).addClass("maxs-button-disabled");
      $( "#comebacktothisone" ).addClass("maxs-button-disabled");
      $( "#review" ).addClass("maxs-button-disabled");
      
      //set their points, they start with 0 obviously
      $( "#points" ).text(userspoints);
      
      //Load the first image, placid waters 
      var placidsrc = "/FlashCardSharkWeb/images/fcs1.svg";
      $( "#sharkgraphic" ).attr("src",placidsrc);
      
      currentpoints = $( "#currentpoints" ).text();
      currentpoints = parseInt(currentpoints,10);
      //currentpoints += 100;
      console.log("current points on load: "+currentpoints);
      
      var currentrank = $( "#currentrank" ).text();
      $( "#ensignia" ).attr('src',calculateEnsignia(currentrank)); 
      
      //display all shared cards in scuttlebutt
      
      //load question texts into card grid
      $.get("/lod1/Data",{name:"pagechange",pagenumber: 1},function(list){
          $.each(list,function(index,card){
             $("#questionsforsets").append('<tr><td class="questioncell" data-cardid="'+card.flashCardnum+'" ><div class="longtexttd">'+card.card+'</div></td><td>'+card.category+'</td><td>'+card.made+'</td><td>'+card.missed+'</td></tr>'); 
          });
      },"json");
      
      //show all public sets
      loadScuttlebutt();
      
    }
    
    
    function increasePoints() {
        //ran every time they click nailed it !
        //2X for first streak level
        //3X for second level
        //10X for third level ! 
        //20X for fourth level !!
        //points * 1.5 for fifth level !!!
        // points double for level six.
       
        if(streak < 3) {
            userspoints += 10;
        } else if(streak >= 3 && streak < 5) {
            userspoints += 20;
            $( "#pointsdiv" ).addClass("onStreak1");
        } else if(streak >= 5 && streak < 10) {
            userspoints += 30; 
            $( "#pointsdiv" ).removeClass("onStreak1");
            $ ( "#pointsdiv" ).addClass("onStreak2");
        } else if(streak >= 10 && streak < 20) {
            userspoints += 100;
            $( "#pointsdiv" ).removeClass("onStreak2");
            $( "#pointsdiv" ).addClass("onStreak3");
        } else if(streak >= 20 && streak < 30) {
            userspoints += 200;
            $( "#pointsdiv" ).removeClass("onStreak3");
            $( "#pointsdiv" ).addClass("onStreak4");
        } else if(streak >= 30 && streak < 50) {
            userspoints = Math.round( userspoints * 1.5);
            $( "#pointsdiv" ).removeClass("onStreak4");
            $( "#pointsdiv" ).addClass("onStreak5");
        } else if(streak >= 50 && streak < 100) {
            $( "#pointsdiv" ).removeClass("onStreak5");
            $( "#pointsdiv" ).addClass("onStreak6");
            userspoints *= 2;
        } else if(streak >= 100) {
            //exponential increase
            $( "#pointsdiv" ).removeClass("onStreak6");
            $( "#pointsdiv" ).addClass("onStreak7");
            userspoints *= userspoints;
        }
        
        if($( "#points" ).hasClass("pointsMissedStreak")){
            $( "#points" ).removeClass("pointsMissedStreak").addClass("pointsNormal");
        }
        
        $( "#points" ).text(userspoints).effect("bounce","slow");
           
    }
    
    function decreasePoints() {
        // missed streak is severe
        
        if(missedstreak < 3) {
            userspoints -= 5;
        } else if(missedstreak >= 3 && missedstreak < 7) {
            userspoints -= 10;
            $( "#points" ).removeClass("pointsNormal").addClass("pointsMissedStreak");
        } else if(missedstreak >=7 && missedstreak < 10) {
            userspoints -= 20;
        } else {
            userspoints = Math.round(userspoints * .5);
        }
            
        $( "#points" ).text(userspoints).effect("pulsate","slow");

    }
    
    function disableStreakEffects() {
        // remove the streaking class because they missed one
        if(streak < 3) {
            //do nothing
        } else if(streak >= 3 && streak < 5) {
            $( "$pointsdiv" ).removeClass("onStreak1");
        } else if(streak >= 5 && streak < 10) {
           $ ( "#pointsdiv" ).removeClass("onStreak2");
        } else if(streak >= 10 && streak < 20) {
            $( "#pointsdiv" ).removeClass("onStreak3");
        } else if(streak >= 20 && streak < 30) {
            $( "#pointsdiv" ).removeClass("onStreak4");
        } else if(streak >= 30 && streak < 50) {
            $( "#pointsdiv" ).removeClass("onStreak5");
        } else if(streak >= 50 && streak < 100) {
            $( "#pointsdiv" ).removeClass("onStreak6");
        } else if(streak >= 100) {
            $( "#pointsdiv" ).removeClass( "onStreak7" );
        }
        
    }
    
    function changeStoryFrame() {
        //load first image
        //use questions clicked for this, as they progress the boat goes out 
        //further then they dive down in a cage if they miss one something wrong happens.
        //If they miss enough they die...
        //this story will have to be different for each character
        
        /*var storynumber = Math.floor(Math.random() * 10) + 1;
        if(storynumber >=1 && storynumber <= 3){
            
        } */
        
        if(questionsclicked == 1){
            
        }
        
        if(questionsclicked > 1 && questionsclicked <= 4){
            
        }
 
    }
    
    function calculateNextRank(){
        var newtotal = currentpoints + userspoints;
        upgraded = false;
        newrank = 'none';
        
        if(currentpoints < 2500 && newtotal >= 2500){
            //show pop up on logout...
            upgraded = true;
            newrank = 'Bucket Brigade';
            $( "#newbadgemessage" ).text(bbmessage);
            $( "#popupnewbadge" ).attr("src","images/bucketbrigade.svg");
        } else if(currentpoints >= 2500 && currentpoints < 7000 && newtotal >= 7000) {
            upgraded = true;
            newrank = 'Harpoonist';
            $( "#newbadgemessage" ).text(hmessage);
            $( "#popupnewbadge" ).attr("src","images/harpoonist.svg");
        } else if(currentpoints >= 7000 && currentpoints < 15000 && newtotal >= 15000){
            upgraded = true;
            newrank = 'Free Diver';
            $( "#newbadgemessage" ).text(fdmessage);
            $( "#popupnewbadge" ).attr("src","images/freediver.svg");
        } else if(currentpoints >= 15000 && currentpoints < 30000 && newtotal >= 30000) {
            upgraded = true;
            newrank = 'Cage Master';
            $( "#newbadgemessage" ).text(cmmessage);
            $( "#popupnewbadge" ).attr("src","images/cagemaster.svg");
        } else if(currentpoints >= 30000 && currentpoints < 75000 && newtotal >= 75000){
            upgraded = true;
            newrank = 'The Bitten';
            $( "#newbadgemessage" ).text(tbmessage);
            $( "#popupnewbadge" ).attr("src","images/thebitten.svg");
        } else if(newtotal >= 150000){
            upgraded = true;
            newrank = 'Great White';
            $( "#newbadgemessage" ).text(gwmessage);
            $( "#popupnewbadge" ).attr("src","images/greatwhite.svg");
        }
        
        
    }
    
    function changeChumGraphic() {
        var imgnumber = Math.floor(Math.random() * 10);
        var nextgraphic;
        
        switch(imgnumber){
            case 0: nextgraphic = "images/chumpic1.svg"; break;
            case 1: nextgraphic = "images/chumpic2.svg"; break;
            case 2: nextgraphic = "images/chumpic3.svg"; break;
            case 3: nextgraphic = "images/chumpic4.svg"; break;
            case 4: nextgraphic = "images/chumpic5.svg"; break;
            case 5: nextgraphic = "images/chumpic6.svg"; break;
            case 6: nextgraphic = "images/chumpic7.svg"; break;
            case 7: nextgraphic = "images/chumpic8.svg"; break;
            case 8: nextgraphic = "images/chumpic9.svg"; break;
            case 9: nextgraphic = "images/chumpic10.svg"; break;           
        }
        
        //todo: UNTESTED...
        $("#chumgraphic").fadeOut(500,function(){
           $(this).attr('src',nextgraphic);
           $(this).load(function(){
               $(this).fadeIn(500);
           });
        });
    }

