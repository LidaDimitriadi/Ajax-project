
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

        var url = 'https://maps.googleapis.com/maps/api/streetview?size=1000x1000&location='+ loc +''; //opws sthn PHP, gia na balw metablhth sto string, to concatenation edw einai +
        var image = '<img class="bgimg" src="' + url + '">';
        $("body").append(image);
        return false;
    }
    return false;
};

$('#form-container').submit(loadData);

 loadData();
