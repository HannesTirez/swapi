$(document).ready(function() {

    console.log(window.location.search);
    var index = window.location.search.search("&");
    console.log(index);

    var category = window.location.search.slice(14,index);
    console.log(category);

    var character = (window.location.search.slice(index + 11)).replace(/_/g, " ");
    console.log(character);

    $.ajax({
        type: 'GET',
        url: "https://swapi.co/api/"+category+"/?format=json&search="+character,
        datatype: "json",
        success: function (raw_data) {
            console.log(raw_data);
            var data = raw_data.results;

            //For loop in het geval dat er meerdere entries onder zoekterm zijn
            for(var i=0; i<data.length;i++){
                var character_data=data[i];
                console.log(character_data);

                //MOVIE_FEATURES OR GENERAL_FEATURES
                if (category == "films"){
                    var pagename = data[i].title;

                    $("#info").append("Episode: " + character_data.episode_id);
                    $("#info").append("<br>");
                    $("#info").append("Release date: " + character_data.release_date);
                    $("#info").append("<br>");
                    $("#info").append("Opening: " + character_data.opening_crawl);
                    $("#info").append("<br>");

                } else {
                    var pagename = data[i].name;

                    //GENERAL_FEATURES_MOVIES
                    var films = character_data.films;
                    $("#movieslist").append("Movies: ");
                    for (var j=0; j<films.length;j++){
                        $.ajax({
                            type: 'GET',
                            url: films[j] + "?format=json",
                            datatype: "json",
                            success: function (raw_movie) {
                                var movieTitle = raw_movie.title;
                                var movieTitleUnderscore = movieTitle.replace(/ /g, "_");
                                var movieLink = "SW4_charactersheets.html?categoryName=" + "films" + "&" + "entryName=" + movieTitleUnderscore;
                                //$("#movies").append('<a href='+movieLink+'>'+movieTitle+'</a>');
                                $("#movieslist").append('<li>' + '<a href='+movieLink+'>'+movieTitle+'</a>' + '</li>');
                            }
                        });
                    }
                };

                //GENERAL_FEATURES
                $("#name").append("Name: " + pagename);
                $("#category").append("Category: " + category);
                $("#name").append("<br>");



                //FEATURES DEPENDING ON CATEGORIES
                //PEOPLE_FEATURES
                if (category == "people"){
                    $("#info").append("Gender: " + character_data.gender);
                    $("#info").append("<br>");
                    $("#info").append("Birth year: " + character_data.birth_year);


                    //PEOPLE_HOMEWORLD
                    var homeworld = character_data.homeworld;
                    $("#homeworld").append("Homeworld: ");
                    $.ajax({
                        type: 'GET',
                        url: homeworld + "?format=json",
                        datatype: "json",
                        success: function (raw_homeworld) {
                            var homeworldName = raw_homeworld.name;
                            var homeworldNameUnderscore = homeworldName.replace(/ /g, "_");
                            var homeworldLink = "SW4_charactersheets.html?categoryName=" + "planets" + "&" + "entryName=" + homeworldNameUnderscore;
                            $("#homeworld").append('<a href='+homeworldLink+'>'+homeworldName+'</a>');
                        }
                    });

                    //PEOPLE_SPECIES
                    var species = character_data.species;
                    $("#species").append("Species: ");
                    $.ajax({
                        type: 'GET',
                        url: species + "?format=json",
                        datatype: "json",
                        success: function (raw_species) {
                            var speciesName = raw_species.name;
                            var speciesNameUnderscore = speciesName.replace(/ /g, "_");
                            var speciesLink = "SW4_charactersheets.html?categoryName=" + "species" + "&" + "entryName=" + speciesNameUnderscore;
                            $("#species").append('<a href='+speciesLink+'>'+speciesName+'</a>');
                        }
                    });

                    //PEOPLE_VEHICLES
                    var vehicles = character_data.vehicles;
                    $("#vehicleslist").append("Vehicles: ")
                    for (var j=0; j<vehicles.length;j++){
                        $.ajax({
                            type: 'GET',
                            url: vehicles[j] + "?format=json",
                            datatype: "json",
                            success: function (raw_vehicle) {
                                var vehicleName = raw_vehicle.name;
                                var vehicleNameUnderscore = vehicleName.replace(/ /g, "_");
                                var vehicleLink = "SW4_charactersheets.html?categoryName=" + "vehicles" + "&" + "entryName=" + vehicleNameUnderscore;
                                //$("#vehicles").append('<a href='+vehicleLink+'>'+vehicleName+'</a>');
                                $("#vehicleslist").append('<li>' + '<a href='+vehicleLink+'>'+vehicleName+'</a>' + '</li>');

                            }
                        });
                    }

                    //PEOPLE_STARSHIPS
                    var starships = character_data.starships;
                    $("#starshipslist").append("Starships: ");
                    for (var j=0; j<starships.length;j++){
                        $.ajax({
                            type: 'GET',
                            url: starships[j] + "?format=json",
                            datatype: "json",
                            success: function (raw_starship) {
                                var starshipName = raw_starship.name;
                                var starshipNameUnderscore = starshipName.replace(/ /g, "_");
                                var starshipLink = "SW4_charactersheets.html?categoryName=" + "starships" + "&" + "entryName=" + starshipNameUnderscore;
                                //$("#starships").append('<a href='+starshipLink+'>'+starshipName+'</a>');
                                $("#starshipslist").append('<li>' + '<a href='+starshipLink+'>'+starshipName+'</a>' + '</li>');

                            }
                        });
                    }

                }

                //PLANETS_FEATURES
                if (category == "planets") {
                    $("#info").append("Terrain: " + character_data.terrain);
                    $("#info").append("<br>");
                    $("#info").append("Climate: " + character_data.climate);

                    //PLANETS_INHABITANTS
                    var residents = character_data.residents;
                    $("#residentlist").append("Residents: ");
                    for (var j=0; j<residents.length;j++){
                        $.ajax({
                            type: 'GET',
                            url: residents[j] + "?format=json",
                            datatype: "json",
                            success: function (raw_resident) {
                                var residentName = raw_resident.name;
                                var residentNameUnderscore = residentName.replace(/ /g, "_");
                                var residentLink = "SW4_charactersheets.html?categoryName=" + "people" + "&" + "entryName=" + residentNameUnderscore;
                                //$("#residents").append('<a href='+residentLink+'>'+residentName+'</a>');
                                $("#residentlist").append('<li>' + '<a href='+residentLink+'>'+residentName+'</a>' + '</li>');

                            }
                        });
                    }
                }

                //SPECIES_FEATURES
                if (category == "species") {
                    $("#info").append("Classification: " + character_data.classification);
                    $("#info").append("<br>");
                    $("#info").append("Language: " + character_data.language);

                    //SPECIES_PEOPLE
                    var people = character_data.people;
                    $("#peoplelist").append("Characters: ");
                    for (var j=0; j<people.length;j++){
                        $.ajax({
                            type: 'GET',
                            url: people[j] + "?format=json",
                            datatype: "json",
                            success: function (raw_people) {
                                var peopleName = raw_people.name;
                                var peopleNameUnderscore = peopleName.replace(/ /g, "_");
                                var peopleLink = "SW4_charactersheets.html?categoryName=" + "people" + "&" + "entryName=" + peopleNameUnderscore;
                                //$("#people").append('<a href='+peopleLink+'>'+peopleName+'</a>');
                                $("#peoplelist").append('<li>' + '<a href='+peopleLink+'>'+peopleName+'</a>' + '</li>');

                            }
                        });
                    }

                    //PEOPLE_HOMEWORLD
                    var homeworld = character_data.homeworld;
                    $("#homeworld").append("Homeworld: ");
                    $.ajax({
                        type: 'GET',
                        url: homeworld + "?format=json",
                        datatype: "json",
                        success: function (raw_homeworld) {
                            var homeworldName = raw_homeworld.name;
                            var homeworldNameUnderscore = homeworldName.replace(/ /g, "_");
                            var homeworldLink = "SW4_charactersheets.html?categoryName=" + "planets" + "&" + "entryName=" + homeworldNameUnderscore;
                            $("#homeworld").append('<a href='+homeworldLink+'>'+homeworldName+'</a>');
                        }
                    });

                }

                //VEHICLES_FEATURES
                if (category == "vehicles") {
                    $("#info").append("Model: " + character_data.model);
                    $("#info").append("<br>");
                    $("#info").append("Vehicles class: " + character_data.vehicle_class);
                    $("#info").append("<br>");
                    $("#info").append("Cost in credits: " + character_data.cost_in_credits);
                    $("#info").append("<br>");
                    $("#info").append("Crew: " + character_data.crew);
                    $("#info").append("<br>");
                    $("#info").append("Passengers: " + character_data.passengers);
                    $("#info").append("<br>");

                    //VEHICLES_PILOTS
                    var pilots = character_data.pilots;
                    $("#pilotslist").append("Pilots: ");
                    for (var j=0; j<pilots.length;j++){
                        $.ajax({
                            type: 'GET',
                            url: pilots[j] + "?format=json",
                            datatype: "json",
                            success: function (raw_pilots) {
                                var pilotsName = raw_pilots.name;
                                var pilotsNameUnderscore = pilotsName.replace(/ /g, "_");
                                var pilotsLink = "SW4_charactersheets.html?categoryName=" + "people" + "&" + "entryName=" + pilotsNameUnderscore;
                                //$("#pilots").append('<a href='+pilotsLink+'>'+pilotsName+'</a>');
                                $("#pilotslist").append('<li>' + '<a href='+pilotsLink+'>'+pilotsName+'</a>' + '</li>');
                            }
                        });
                    }
                }

                //STARSHIPS_FEATURES
                if (category == "starships") {
                    $("#info").append("Model: " + character_data.model);
                    $("#info").append("<br>");
                    $("#info").append("Starship class: " + character_data.starship_class);
                    $("#info").append("<br>");
                    $("#info").append("Cost in credits: " + character_data.cost_in_credits);
                    $("#info").append("<br>");
                    $("#info").append("Crew: " + character_data.crew);
                    $("#info").append("<br>");
                    $("#info").append("Passengers: " + character_data.passengers);
                    $("#info").append("<br>");

                    //STARSHIPS_PILOTS
                    var pilots = character_data.pilots;
                    $("#pilotslist").append("Pilots: ");
                    for (var j=0; j<pilots.length;j++){
                        $.ajax({
                            type: 'GET',
                            url: pilots[j] + "?format=json",
                            datatype: "json",
                            success: function (raw_pilots) {
                                var pilotsName = raw_pilots.name;
                                var pilotsNameUnderscore = pilotsName.replace(/ /g, "_");
                                var pilotsLink = "SW4_charactersheets.html?categoryName=" + "people" + "&" + "entryName=" + pilotsNameUnderscore;
                                //$("#pilots").append('<a href='+pilotsLink+'>'+pilotsName+'</a>');
                                $("#pilotslist").append('<li>' + '<a href='+pilotsLink+'>'+pilotsName+'</a>' + '</li>');
                            }
                        });
                    }
                }





                    //Als swapi API succesvol is gecalled, google API met de juiste name callen om foto te laden

                var keys = ["AIzaSyA5qPB6RXRNTd-ey5HtoWSId_LqFqdCao8","AIzaSyBVfONwU1myaoVrOLPiwpkYujC3Cfdok6M","AIzaSyD1M-8Wc3eLSx9_ShpzH01UdsnJTQ4ApSk"];
                var key = keys[Math.floor(Math.random() * keys.length)];

                //setTimeout(function (){
                $.ajax({
                    // The data source
                    url: "https://www.googleapis.com/customsearch/v1?q=" +
                    pagename + " star wars" +
                    "&cx=000105201365211844310%3Az7onvev0wse" +
                    "&key="+ key,
                    success: function (result) {
                        var items = result.items;

                        var currentItem = items[0];
                        // console.log(currentItem);

                        var image = currentItem.pagemap.cse_image[0];
                        var imageLink = image.src;
                        console.log(imageLink);

                        var output = '<img class="resize" src="' + imageLink + '"alt="image">';

                        $("#image").append(output);
                    },
                    error: function (result) {
                        console.log("Error: " + result);
                    }
                });
                //}, 1000);
            //    Temporarily fix with timeout, need to make it execute after the rest is added
            }

        }
    });
});