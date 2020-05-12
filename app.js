$(document).ready(function() {


var topics = ["science","corgi", "weights", "tulips", "disneyland", "simba"];
var results;

function createButtons(){
    $(".buttons").empty();

    for (var i=0; i<topics.length; i++){
        var a = $("<button>");
        a.addClass("subject");
        a.attr("data-topic", topics[i]);
        a.text(topics[i]);
        $(".buttons").append(a);        
    };
};

$("#add-subject").on("click", function(event){

    event.preventDefault();

    var newSubject = $("#input").val().trim();

    topics.push(newSubject);

    createButtons();
    console.log(topics);
   

});


createButtons();


function displayGif(){

    var subject = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    subject + "&api_key=jYUXFR4smqls1PsJGd9uX9MCg8qqoE0N&limit=10";

//initiate ajax call within function 

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);


    results = response.data;

    $("#gifs-go-here").empty();

    for (var i=0; i< results.length; i++){

        var topicDiv = $("<div>");
        var p = $("<p>");
         p.text("Rating: " + results[i].rating);

    var topicImage = $("<img>");
    topicImage.attr("src", results[i].images.fixed_height_still.url);
    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
    topicImage.attr("data-animate", results[i].images.fixed_height.url);
    topicImage.attr("data-state", "still");
    topicImage.addClass("gif-results");

    topicDiv.append(p)
    topicDiv.append(topicImage);
    topicDiv.addClass("gifs");

    $("#gifs-go-here").prepend(topicDiv);

    };
});
};

$(document).on("click", ".subject",displayGif);


$(document).on("click", ".gif-results", function(){
    var state = $(this).attr("data-state");

    
    if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");

  }
}); 


});

