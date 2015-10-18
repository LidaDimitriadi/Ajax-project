
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $("#street").val();
    var city = $("#city").val();
    var loc = street + "," + city;
    if (loc != ",") {               //elegxw an o xrhsths exei balei input gia na ftia3w to background kai to greeting
        var greetingInit = $greeting.html();    //an exei balei input 8a antikatasthsw to greeting sto html arxeio me to kainourio greeting
        var greetingTxt = '<h2 id="greeting" class="greeting">So you want to live in ' + loc + '?</h2>'; //ftiaxnw to neo html h2 node
        $greeting.replaceWith(greetingTxt);                 //replaceWith jQuery function

        //deyterh me8odos gia to replacement:
        //$greeting.text(greetingTxt);             //telika to text() mporei na kanei automata ta replacements, dinontas ws argument to kainourio value!!!

        var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ loc +''; //opws sthn PHP, gia na balw metablhth sto string, to concatenation edw einai +
        var image = '<img class="bgimg" src="' + url + '">';
        $("body").append(image);


        //load ny articles, pairnw to URL opws me odhgei to API tou NYT kai bazw antistoixes parametrous
        var NYTstring = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&page=0&sort=newest&api-key=7fa8bd6250a3024fc4527c97efc18ed8:10:73229511';
        $.getJSON(NYTstring, function(data){
            $("#nytimes-header").text('New York Times articles about your favorite city: ' + city + '!');
            var object = data.response;     //pairnw ta data
            var items = [];
            for (var i in object.docs) {     //pairnw ta data ka8e ar8rou 3exwrista
                items[i] = object.docs[i];   //to ka8e stoixeio tou items[] exei ena apota ar8ra me ola ta upostoixeia tou
                //console.log(items[i]);
                var li_append = '<li class="article"><a href="' + items[i].web_url + '">' + items[i].headline.main + '</a><p>' + items[i].snippet + '</p></li>';
                $("#nytimes-articles").append(li_append);
            };
        }).error( function(){                   //thn kollaw sthn $.getJSON kai an kati den paei kala, paizei, alliws agnoeitai///////////////PAIZEI TO IDIO KAI H .fail()/////////
            $nytHeaderElem.text("New York Times articles could not be loaded!");
        });
       ////////////////////////EDW EIMAI wikipedia-headerhttps://www.mediawiki.org/wiki/API:Search_and_discovery//////////////////// 
       var wikiRequestTimeout = setTimeout(function(){       //error handling gia jsonp, an arghsei polu na ektelestei,ara kati den paei kala, tote tupwnw mhnuma
           $("#wikipedia-header").text('Error with the Wikipedia request.'); 
        }, 8000);
        var WikiStr = 'https://en.wikipedia.org/w/api.php';
        $.ajax({
            url: WikiStr, 
            data: {action: 'query', list: 'search', srsearch: city, format: 'json'},
            dataType: 'jsonp', 
            success: function(data){
                var Wiki_object = data.query;
                var Wiki_title, city_URL;
                for (var i in Wiki_object.search){
                    Wiki_title = Wiki_object.search[i].title;
                    city_URL = 'https://en.wikipedia.org/wiki/' + Wiki_title + "";
                    $wikiElem.append('<li><a href="' + city_URL + '">' + Wiki_title + '</a><p>' + Wiki_object.search[i].snippet + '</p></li>');
                }
                clearTimeout(wikiRequestTimeout);      //stamataw thn setTimeout an telika ektelestei h ajax request se ligotero apo 8 secs
            }                                          //alliws se 8 sec 8a ektelestei h function pou tupwnei antistoixo mhnuma apotuxias 
        });
    }
    return false;
};

$('#form-container').submit(loadData);

 loadData();
