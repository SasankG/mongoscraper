//TODO: Make submit button show comment

$(document).ready(function(){
    //get request from server from db for articles
    $.get("/scrape",function(data){
        console.log(data);
    })

    let commenter = $(".cmnter").val();

    $(".submitter").click(function(){
        $(".carder").text($(commenter))
    })

})