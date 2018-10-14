//TODO: Make submit button show comment

$(document).ready(function(){
    //get request from server from db for articles
    //$.get("/scrape",function(data){
    //    console.log(data);
   // })

    console.log("Hi");

    
    let commenter = $("#cmnter").val();
    $(".submitter").click(function(e){
        e.preventDefault();
        console.log(commenter);
        $('.commentList').text(commenter);
        $(".former").find('input:text').val('')
    })
    
})