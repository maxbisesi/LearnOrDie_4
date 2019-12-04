console.log('JS registration page loaded ');

$(document).ready(function(){
    console.log('JS REgistration page document.ready()');
    
    $('input').keyup(function() {
        if($('#emailfield').val() != ''){
            $('#submitbutton').removeAttr('disabled');
        }
    });
    
});