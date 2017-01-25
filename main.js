$(document).ready(function() {

  $("body").keypress(function(e){
    console.log(`You pressed a key! ${e.keyCode}`);
    if(e.keyCode == 13){
      $(".search-btn").click();
      document.activeElement.blur();
    }
  })

  //attach search function to the button
  $(".search-btn").click(function(){
    //this pulls the text from the input field so you can use it to search wikipedia
    var searchTerm = $("input").val();

    //this gets the JSON data you need and incorporates the search term you pulled above. it must end with that callback and needs to be in json format
    $.getJSON("https://en.wikipedia.org/w/api.php?&action=opensearch&search=" + searchTerm + "&format=json&callback=?", function(data) {
   //if no data is found at data[1] then no results were found
      if (data[1].length == 0){
        $(".newStuff").html("No matches found.  Please try another search query.")
      };

   //iterate through the data to get it into the correct format. the data is all there, it's just formatted a bit funky. the JSON call above will group all the titles, descriptions, and urls with each other. but we want to have each group consist of the related title, description, and url. the code below does this by iterating through each group and pulling the items at the same spot in the three different arrays

      for (i = 0; i < data[1].length; i++) {
        var title = data[1][i];
        var description = data[2][i];
        var link = data[3][i];
        let emptySpace = $(".newStuff").html();
        //combine the data with some html in order to get boxes to appear that are clickable
        var combinedData = "<a href='" + link + "'>" + "<div class = 'well search_result'> " + "<div class='name'>" + title.toUpperCase() + "</div>" + description + "</div></a>";

        if(i==0 && emptySpace !== ''){
          $(".newStuff").html('');
        }
        //put all that data on the page
        $(".newStuff").append(combinedData);
      }
    });
  });
});
