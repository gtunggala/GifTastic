

// HOST
// api.giphy.com

// PATH
// GET /v1/gifs/search

// key: tLhhmbIr7oigYS7Q6RvF9zhGa48cHBic

// search parameters:
// q= rainbow

var api= "https://api.giphy.com/v1/gifs/search?";
var apiKey= "&api_key=tLhhmbIr7oigYS7Q6RvF9zhGa48cHBic";

var availableAtl = [
    'Atlanta',
    'Hip-hop',
    'Peach',
    'Real Housewives of Atlanta',
    'Atlanta UNITED',
    'Atlanta Falcons',
    'Atlanta Hawks',
    'Bird scooter',
    'Outkast',
    'Murder Kroger',
    'Donald Glover',
    'Chicken wings',
    'Traffic',
    'Atlanta FX',
    'Teddy Perkins',
    'Buford Highway',
    'Snowpocalypse',
    'Georgia',
    'Buckhead',
    'Dirty south',
    'The Shane Company'
]

function renderAtlButton() {
    $('#buttons-view').empty();

    for (var i= 0; i < availableAtl.length; i++) {
        // console.log(availableAtl[i]);

        const button= $('<button>'); //dynamically creating buttons
        button.addClass('atlBtn');
        button.attr("dataname", availableAtl[i]); 
        button.text(availableAtl[i]); //text for buttons
        $('#buttons-view').append(button);
    }
}

function setup() {

    const gif= $(this).attr('dataname');
    const queryURL= 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=tLhhmbIr7oigYS7Q6RvF9zhGa48cHBic' + '&limit=10';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);

        $('.atlanta').empty(); //clears the .atlanta div
        var results= response.data;
        console.log (results);
        const gifDiv= $('<div>');

        for (var i= 0; i < results.length; i++) {
            
            const atlRating= results[i].rating;
            // console.log(atlRating);

            const displayatlRating= $('<p>').text('Rated" ' + atlRating);
            const atlImgURL= results[i].images.downsized_large.url;
            // console.log(atlImgURL);

            const atlGifImg= $('<img>').attr('src', atlImgURL);

            gifDiv.prepend(displayatlRating);
            gifDiv.prepend(atlGifImg);
        }

        $('#atlGIFview').html(gifDiv);
    })
};
$('#find-atlanta').on('click', function() {
    event.preventDefault();
    var newButton= $('#atlanta-input').val().trim();
    availableAtl.push(newButton);
    renderAtlButton();
    // console.log(availableAtl);
});

//$('.atlBtn').on('click', setup()); IDK what this part is

$(document).on('click', '.atlBtn', setup);
renderAtlButton();
