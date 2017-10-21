/* 1. Search Wikipedia using a search box and view the Wiki entry.
   2. Click a button to see a random Wikipedia entry. https://en.wikipedia.org/wiki/Special:Random */

$(document).ready(function() {

    $("form").submit(function(event) {
        event.preventDefault();

        var myURL = getRequestURL();

        $.getJSON(myURL, function(json) {
            var item, titles, extracts, links, packageList, htmlString;
            titles = json[1];
            extracts = json[2];
            links = json[3];            

            // Create unordered list element in DOM within the wikireturns div
            packageList = document.createElement("ul");
            document.getElementById("wikireturns").appendChild(packageList);

            // Storage var for html string
            htmlString = "";

            // Chunk the returned JSON info together by subject
            for (item = 0; item < titles.length; item++){
                // Add the complete chunk to the html string as a list item
                htmlString += "<li><a href=" + links[item] + "><span class=\"title\">" + titles[item] + "<\/span><br \/>" + extracts[item] + "<\/a><\/li>";
            }

            // Populate ul with html
            packageList.outerHTML = htmlString;             

        });
    });      
});

function getRequestURL() {
    var userInput, requestURL;
    userInput = document.getElementById("query").value.toLowerCase();
    requestURL = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&search=" + userInput + "&prop=extracts&exchars=175&format=json&callback=?";
    return requestURL;
};
