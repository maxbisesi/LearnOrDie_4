/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $('img').click(function(e){
       var avatar = this.name;
       $.ajax({
              type:"post",
              url:"/lod1/registrationPage",
              data: {
                  name: "saveavatar",
                  avatar: avatar
              },
              success: function(response,staus){
                  console.log("Your avatar updated correctly");

              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log("Your avatar did not update: "+textStatus);
                  console.log(errorThrown);
              }
          });
    });
});

