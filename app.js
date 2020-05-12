$(document).ready(function() {

//initial array of topics
var topics = ["Leslie Knope", "Treat Yo' Self ", "Ron Swanson", "Gryzzl", "Cones of Dunshire", "Money Please", "LITerally", "Pawnee"];
//global variable
var results;

//function to create buttons for each of the items in the array
function createButtons(){
    $(".buttons").empty();

    for (var i=0; i<topics.length; i++){
        var a = $("<button>");
        a.addClass("subject");
        a.attr("data-topic", topics[i]);
        a.text(topics[i].toUpperCase());
   //adding buttons to button div     
        $(".buttons").append(a);        
    };
};

//onclick for add apps and zerts submit button
$("#add-subject").on("click", function(event){

    event.preventDefault();

    var newSubject = $("#input").val().trim();

    topics.push(newSubject);

   //creating new button for typed submission 
    createButtons();
    console.log(topics);
});


createButtons();

//function to initiate AJAX call based on button topic
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

//define results
    results = response.data;

    $("#gifs-go-here").empty();

    for (var i=0; i< results.length; i++){

        var topicDiv = $("<div>");
        var p = $("<p>");
         p.text("RATING: " + results[i].rating.toUpperCase());
    
    //creating new image element with attributes("data-still", "data-animate", "data-state")     
    var topicImage = $("<img>");
    topicImage.attr("src", results[i].images.fixed_height_still.url);
    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
    topicImage.attr("data-animate", results[i].images.fixed_height.url);
    topicImage.attr("data-state", "still");
    topicImage.addClass("gif-results");

    topicDiv.append(p)
    topicDiv.append(topicImage);
    topicDiv.addClass("gifs");

    //adding new div to gifs-go-here div
    $("#gifs-go-here").prepend(topicDiv);
    };
});
};

$(document).on("click", ".subject",displayGif);

//onclick to pause and unpause gifs
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

