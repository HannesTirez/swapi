$(document).ready(function() {

    var category = $("#category").text();
    console.log(category);

    $("#explore" + category).append("<br>");
    for(var i=1;i<10;i++){
        $.ajax({
            type: 'GET',
            url: "https://swapi.co/api/"+category+"/?page="+i+"&format=json",
            datatype: "json",
            success: function (raw_data) {
                var data = raw_data.results;
                for(var i=0;i<data.length; i++){

                    if (category == "films"){
                        var pagename = data[i].title;
                    } else {
                        var pagename = data[i].name;
                    };

                    console.log(pagename);

                    var pagenameUnderscore = pagename.replace(/ /g, "_");
                    var entryLink = "SW4_charactersheets.html?categoryName=" + category + "&" + "entryName=" + pagenameUnderscore;
                    //$("#explore" + category).append('<a href='+entryLink+'>'+pagename+'</a>');
                    //$("#explore" + category).append("<br>");

                    //$("#myTable_" + category).append('<tr><td>'+ '<ul>' + '<a href='+entryLink+'>'+pagename+'</a>'+'</ul>' +'</td></tr>');
                    //$("#myTable_" + category).append("<br>");

                    $("#explore" + category + i).append('<tr><td>' + '<a href='+entryLink+'>'+ pagename +'</td></tr>');


                }
             }
        });
    }
});

// // Sets the number of stars we wish to display
// const numStars = 100;
//
// // For every star we want to display
// for (let i = 0; i < numStars; i++) {
//     let star = document.createElement("div");
//     star.className = "star";
//     var xy = getRandomPosition();
//     star.style.top = xy[0] + 'px';
//     star.style.left = xy[1] + 'px';
//     document.body.append(star);
// }
//
// // Gets random x, y values based on the size of the container
// function getRandomPosition() {
//     var y = window.innerWidth;
//     var x = window.innerHeight;
//     var randomX = Math.floor(Math.random()*x);
//     var randomY = Math.floor(Math.random()*y);
//     return [randomX,randomY];
// }