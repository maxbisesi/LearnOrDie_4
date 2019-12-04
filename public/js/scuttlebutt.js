
$( document ).ready(function() {
    
});

function loadScuttlebutt() {
    //load up shared sets with their users, create sections for each.
    $.get("/lod1/Scuttlebutt",{name:"onload",data: -1},function(jsondata) {
        var numberofusers = jsondata.length;
        var i = 0;
        
        $(".mate").each(function(index) {
            //show
            $(this).css("display","block");
            //construct new id
            var mateid = 'mate'+jsondata[i][0].userid;
            //create ids for this mate
            $(this).attr('id',mateid+"Mate");
            $(this).find(".mateavatar").attr("id",mateid+"Avatar");
            $(this).find("#matename").attr("id",mateid+"Name");
            $(this).find("#matepoints").attr("id",mateid+"Points");
            $(this).find("#matesensignia").attr("id",mateid+"Ensignia");
            $(this).find("#matebio").attr("id",mateid+"Bio");
            $(this).find("#matesets").attr("id",mateid+"Sets");
            $(this).find("#matebadges").attr("id",mateid+"Badges");
            //fill in correct info
            $(this).find("#"+mateid+"Name").text(jsondata[i][0].userName);
            $(this).find("#"+mateid+"Points").text(jsondata[i][0].points);
            $(this).find("#"+mateid+"Ensignia").attr('src',calculateEnsignia(jsondata[i][0].rank));
            
            //Add clickable class to matename td
            $(this).find("#"+mateid+"Name").addClass("clickablematename");
            
            //increment
            i++;
            if(i < numberofusers){
               return true; 
            }else{
                return false;
            }
        });
        
        //add onclick handler to username
        $(".clickablematename").on('click',function(){
            var num_tabs = $("div#tabmenu ul li").length + 1;
            var username = $(this).text();
            
            $("div#tabmenu ul").append(
                "<li><a href='#tab" + username + "'>" + username + "</a></li>"
            );
    
            $("div#tabmenu").append(
                "<div id='tab" + username + "'></div>"
            );
            
            $("#tab"+username).load("/lod1/profileTemplate.html",function() {
                //fill in template with user's info
                console.log("it worked");
            });
            
            $("div#tabmenu").tabs("refresh");
        });  
        
        
    });
    
}


    function calculateEnsignia(currentrank){
      var source;
      switch(currentrank){
          case 'Recruit': source = 'images/recruit.svg'; break;
          case 'Bucket Brigade': source = 'images/bucketbrigade.svg'; break;
          case 'Harpoonist': source = 'images/harpoonist.svg'; break;
          case 'Free Diver': source = 'images/freediver.svg'; break;
          case 'Cage Master': source ='images/cagemaster.svg'; break;
          case 'The Bitten': source = 'images/thebitten.svg'; break;
          case 'Great White': source = 'images/greatwhite.svg'; break;
      }
      return source;
    }

