//TODO: Make submit button show comment

$(document).ready(function(){
    //get request from server from db for articles
    //$.get("/scrape",function(data){
    //    console.log(data);
   // })

    console.log("Hi");

    
    
    $(".submitter").click(function(e){
        let commenter = $("#cmnter").val();
        e.preventDefault();
        console.log(commenter);
        $('.commentList').text(commenter);
        $(".former").find('input:text').val('')
    })
    
})